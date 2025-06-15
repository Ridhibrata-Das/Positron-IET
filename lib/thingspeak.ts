export interface SoilMoistureData {
  soilMoisture: number;
  time: string;
}

export interface ThingSpeakData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  time: string;
}

export interface ThingSpeakResponse {
  feeds: Array<{
    created_at: string;
    field1: string; // soil moisture
    field2: string; // temperature
    field3: string; // humidity
  }>;
}

export const getThingSpeakUrl = (range: string) => {
  const THINGSPEAK_CHANNEL_ID = process.env.NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID;
  const THINGSPEAK_API_KEY = process.env.NEXT_PUBLIC_THINGSPEAK_READ_API_KEY;

  if (!THINGSPEAK_CHANNEL_ID || !THINGSPEAK_API_KEY) {
    throw new Error('ThingSpeak API configuration is missing');
  }

  const results = {
    '1h': 60,
    '24h': 1440,
    '7d': 10080,
    '30d': 43200,
    '1y': 525600
  }[range] || 1440;
  
  return `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}&results=${results}`;
};

const parseNumericValue = (value: string | null | undefined, fallback: number = 0): number => {
  if (!value) return fallback;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
};

const calculateTrend = (current: number, previous: number): { change: number; increasing: boolean } => {
  if (previous === 0) return { change: 0, increasing: false };
  const change = ((current - previous) / Math.abs(previous)) * 100;
  return {
    change: Math.abs(parseFloat(change.toFixed(1))),
    increasing: change > 0
  };
};

export const fetchSoilMoistureData = async (range: string = '24h'): Promise<{
  currentData: SoilMoistureData;
  historyData: ThingSpeakData[];
  trend: { change: number; increasing: boolean };
}> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(getThingSpeakUrl(range), {
      signal: controller.signal,
      next: { revalidate: 30 } // Cache for 30 seconds
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`ThingSpeak API error: ${response.status}`);
    }

    const data = await response.json();
    const feeds = data.feeds as ThingSpeakResponse['feeds'];
    
    if (!feeds || feeds.length === 0) {
      throw new Error('No data available from ThingSpeak');
    }

    // Get latest readings
    const latest = feeds[feeds.length - 1];
    const previous = feeds[feeds.length - 2] || latest;

    // Convert string values to numbers with proper validation
    const currentSoilMoisture = parseNumericValue(latest.field1);
    const previousSoilMoisture = parseNumericValue(previous.field1);

    // Process history data with validation
    const historyData = feeds.map((feed) => ({
      time: new Date(feed.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      soilMoisture: parseNumericValue(feed.field1),
      temperature: parseNumericValue(feed.field2),
      humidity: parseNumericValue(feed.field3)
    }));

    return {
      currentData: {
        time: new Date(latest.created_at).toLocaleTimeString(),
        soilMoisture: currentSoilMoisture
      },
      historyData,
      trend: calculateTrend(currentSoilMoisture, previousSoilMoisture)
    };
  } catch (error) {
    console.error('Error fetching soil moisture data:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('ThingSpeak API request timed out');
      }
    }
    throw error;
  }
};

export async function fetchThingSpeakHistory(timeRange: string = '24h'): Promise<ThingSpeakData[]> {
  try {
    const channelId = process.env.NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID;
    const apiKey = process.env.NEXT_PUBLIC_THINGSPEAK_READ_API_KEY;
    
    if (!channelId || !apiKey) {
      throw new Error('ThingSpeak configuration missing');
    }

    // Calculate the results count based on the time range
    const resultsCount = {
      '1h': 60,    // 1 minute intervals
      '24h': 144,  // 10 minute intervals
      '7d': 168,   // 1 hour intervals
      '30d': 720,  // 1 hour intervals
      '1y': 8760   // 1 hour intervals
    }[timeRange] || 144;

    const response = await fetch(
      `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=${resultsCount}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch ThingSpeak data');
    }

    const data: ThingSpeakResponse = await response.json();
    
    if (!data.feeds || data.feeds.length === 0) {
      return [];
    }

    return data.feeds.map(feed => ({
      soilMoisture: parseFloat(feed.field1) || 0,
      temperature: parseFloat(feed.field2) || 0,
      humidity: parseFloat(feed.field3) || 0,
      time: new Date(feed.created_at).toLocaleTimeString()
    }));
  } catch (error) {
    console.error('Error fetching ThingSpeak history:', error);
    throw error;
  }
}
