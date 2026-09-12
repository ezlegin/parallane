import ContactForm from "@/components/forms/ContactForm"

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-6 py-20">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
