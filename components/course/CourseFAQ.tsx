import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CourseFAQ() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              FAQ
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Questions?
              <br />
              <span className="text-muted-foreground">We've got answers.</span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
              Everything you need to know about this course, your membership,
              and what happens after you complete it.
            </p>
          </div>

          <Accordion defaultValue={["faq-0"]} className="w-full">
            {FAQ.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-6 text-left text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="pb-6 leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

const FAQ = [
  {
    question: "How long do I have access to the course?",
    answer:
      "Your course access is included with your active Parallane membership. As long as your membership is active, you can return to this course and continue learning at your own pace.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely. There are no fixed class times. Watch the lessons, review the material, and practice whenever it works best for you.",
  },
  {
    question: "Is the certificate included?",
    answer:
      "Yes. Once you successfully complete the required lessons for the course, you'll receive a Parallane certificate of completion with your name on it.",
  },
  {
    question: "What does my membership include?",
    answer:
      "Your membership gives you access to the complete Parallane course library, allowing you to learn across multiple technologies and follow different learning roadmaps without purchasing individual courses.",
  },
  {
    question: "Can I follow a roadmap while taking this course?",
    answer:
      "Yes. Each course is designed to fit into a broader learning path. You can use Parallane roadmaps to understand what to learn next and in which order.",
  },
  {
    question: "Is this course suitable for beginners?",
    answer:
      "Yes. The course is structured to build your understanding step by step rather than assuming that you already know everything.",
  },
]
