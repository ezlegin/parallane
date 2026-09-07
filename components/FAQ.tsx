"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const faqs = [
  {
    question: "What is Parallane?",
    answer:
      "Parallane is an online learning platform for people who want to build for the web. You get access to practical courses, career-focused roadmaps, and everything you need to turn what you learn into real applications.",
  },
  {
    question: "What do I get with a membership?",
    answer:
      "Your membership gives you access to the entire course library, career-focused roadmaps, course completion certificates, and Ask Tutor. You can learn at your own pace and work through the courses in any order.",
  },
  {
    question: "Do I need any previous experience?",
    answer:
      "No. Our courses cover everything from fundamentals to more advanced topics. You can start with the roadmap that matches your current level and follow it step by step.",
  },
  {
    question: "What can I build after completing the courses?",
    answer:
      "The goal is to help you move beyond watching tutorials. You'll learn the technologies and principles needed to design and build websites, web applications, and complete digital products.",
  },
  {
    question: "How do the learning roadmaps work?",
    answer:
      "Roadmaps organize courses into a clear learning path based on your goal. Whether you want to become a web designer, frontend developer, or backend developer, you'll know what to learn next and why it matters.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. There are no fixed class schedules. Start whenever you want, learn at your own pace, and return to the courses whenever you need.",
  },
  {
    question: "Do you offer certificates?",
    answer:
      "Yes. You'll receive a certificate of completion after successfully completing a course.",
  },
  {
    question: "How much does Parallane cost?",
    answer:
      "A standard membership costs $29 per month. You can also choose the annual plan for an effective price of $19 per month, billed annually at $228.",
  },
]

const FAQ = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          {/* Intro */}
          <div className="md:sticky md:top-24 md:self-start">
            <Badge variant="outline" className="rounded-full p-3">
              FAQ
            </Badge>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl lg:text-6xl">
              Questions?
              <br />
              <span className="text-muted-foreground">We've got answers.</span>
            </h2>

            <p className="mt-6 max-w-sm leading-7 text-muted-foreground">
              Everything you need to know about learning, memberships, and
              building your skills with Parallane.
            </p>

            <Button variant="outline" className="mt-8 rounded-full">
              <Link href="/contact" className="flex items-center">
                Still have questions?
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          {/* Accordion */}
          <div>
            <Accordion className="w-full" defaultValue={["item-0"]}>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-b"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-medium tracking-tight hover:no-underline md:text-lg">
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pr-6 pb-6 pl-11 text-sm leading-7 text-muted-foreground md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
