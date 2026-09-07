import Image from "next/image"
import { parallaneLogoIcon, parallaneLogoTypo } from "@/public"

const ParallaneLogo = ({
  width = 25,
  height = 25,
  type = "icon",
  className,
}: {
  width?: number
  height?: number
  type?: "icon" | "typo"
  className?: string
}) => {
  return (
    <Image
      alt="logo"
      src={type === "icon" ? parallaneLogoIcon : parallaneLogoTypo}
      width={width}
      height={height}
      className={className}
    />
  )
}

export default ParallaneLogo
