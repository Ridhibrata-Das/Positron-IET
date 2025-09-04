"use client";

import { Card } from "@/components/ui/card";
import { Brain, CloudRain, LineChart, Smartphone, Timer, Wifi } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Decisions",
    description: "Machine learning algorithms optimize water usage based on historical data and real-time conditions."
  },
  {
    icon: CloudRain,
    title: "Precision Watering",
    description: "Target specific zones with exactly the right amount of water, eliminating waste and improving efficiency."
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards and reports to track water usage, savings, and crop health metrics."
  },
  {
    icon: Smartphone,
    title: "Mobile Control",
    description: "Manage your irrigation system from anywhere using our intuitive mobile application."
  },
  {
    icon: Timer,
    title: "Smart Scheduling",
    description: "Automated watering schedules that adapt to weather forecasts and soil conditions."
  },
  {
    icon: Wifi,
    title: "IoT Integration",
    description: "Seamlessly connect with sensors and controllers across your entire farming operation."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Cutting-edge Features for Modern Farming
          </h2>
          <p className="text-lg text-muted-foreground">
            Our smart irrigation system combines advanced technology with ease of use to revolutionize your farming practices.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}