import { ReactNode } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] py-3">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default layout
