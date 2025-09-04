"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, DollarSign, Droplets, Leaf } from "lucide-react";
import Image from 'next/image';

const benefits = [
  {
    icon: DollarSign,
    title: "Cost Savings",
    stats: "40%",
    description: "Reduction in water-related operational costs through optimized usage and reduced waste."
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    stats: "30%",
    description: "Less water consumption while maintaining or improving crop yield and quality."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    stats: "50%",
    description: "Decrease in environmental impact through efficient resource management."
  }
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:col-span-2 flex justify-center">
            <Image
              src="/photo.jpg"
              alt="Smart Irrigation Benefits"
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Transform Your Farm with Smart Irrigation
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience significant improvements across all aspects of your farming operation with our innovative solution.
            </p>
            
            <div className="grid gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-3xl font-bold text-primary mb-2">
                        {benefit.stats}
                      </p>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button size="lg" className="mt-8">
              Learn More About Benefits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}