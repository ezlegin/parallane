import { MembershipStatus } from "@/prisma/generated/prisma/enums"
import { Badge } from "./ui/badge"

const MembershipBadge = ({
  status,
}: {
  status?: MembershipStatus | "none"
}) => {
  return (
    <Badge
      variant={
        status === "active"
          ? "success"
          : status === "expired"
            ? "destructive"
            : "secondary"
      }
      className="capitalize"
    >
      {status}
    </Badge>
  )
}

export default MembershipBadge
