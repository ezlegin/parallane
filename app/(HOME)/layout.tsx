import { ReactNode } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto] py-4">
      <div className="translate-X-1/2 absolute top-0 right-1/2 size-45 -translate-y-30 scale-x-300 bg-foreground opacity-20 blur-3xl" />
      <Navbar />
      <div className="py-20 md:py-28">{children}</div>
      <Footer />
    </div>
  )
}

export default layout
