import { ReactNode } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto] pb-4">
      <div className="fixed z-10 w-full py-4">
        <Navbar />
      </div>
      <div className="pb-24">{children}</div>
      <Footer />
    </div>
  )
}

export default layout
