"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How does the smart irrigation system work?",
    answer:
      "Our system uses a network of sensors to monitor soil moisture, weather conditions, and plant health in real-time. This data is processed by our AI algorithms to deliver precisely the right amount of water when and where it's needed, optimizing water usage while maximizing crop yields.",
  },
  {
    question: "What kind of support do you provide during installation?",
    answer:
      "We provide comprehensive support throughout the installation process. Our team of experts will survey your farm, create a custom installation plan, and guide your team through the setup. We also offer training sessions to ensure your staff can effectively use all system features.",
  },
  {
    question: "Can the system integrate with my existing irrigation equipment?",
    answer:
      "Yes, our smart irrigation system is designed to work with most existing irrigation infrastructure. We provide adapters and controllers that can be fitted to your current equipment, allowing you to upgrade to smart irrigation without replacing your entire system.",
  },
  {
    question: "What kind of ROI can I expect?",
    answer:
      "Most of our customers see a return on investment within 12-18 months through water savings, reduced labor costs, and improved crop yields. The exact ROI depends on factors like farm size, crop type, and current irrigation practices.",
  },
  {
    question: "Is there a minimum farm size requirement?",
    answer:
      "Our solutions are scalable and can be implemented on farms of any size. We offer different packages tailored to small family farms, medium-sized operations, and large agricultural enterprises.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer:
      "We take data security very seriously. All data is encrypted both in transit and at rest, stored in secure cloud facilities, and protected by multiple layers of security. We comply with all relevant data protection regulations and never share your data with third parties without explicit consent.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
            FAQ
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-200 dark:to-slate-400">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our smart irrigation system and how it can benefit your farming operation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 shadow-xl backdrop-blur-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-muted-foreground/20 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
}