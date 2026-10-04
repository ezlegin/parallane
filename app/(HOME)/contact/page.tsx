import ContactForm from "@/components/forms/ContactForm"
import { getSessionUser } from "@/lib/user"

export default async function ContactPage() {
  const user = await getSessionUser()

  return (
    <div className="mx-auto flex max-w-6xl items-center px-6">
      <ContactForm user={user} />
    </div>
  )
}

export const metadata = {
  title: "Contact",
}
