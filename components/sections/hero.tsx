"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Cloud, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

const benefits = [
  {
    icon: Droplets,
    text: "30% water savings",
  },
  {
    icon: BarChart2,
    text: "20% yield increase",
  },
  {
    icon: Cloud,
    text: "Real-time monitoring",
  },
];

export function HeroSection() {
  const router = useRouter();

  const handleStartTrial = () => {
    router.push('/dashboard');
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Smart Irrigation for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                Precision Farming
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Transform your farm with AI-powered irrigation. Save water, increase yields, and make data-driven decisions with real-time monitoring.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" onClick={handleStartTrial}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2">
                  <benefit.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
              alt="Smart irrigation system in action"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}