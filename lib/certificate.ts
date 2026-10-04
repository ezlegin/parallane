import { prisma } from "@/prisma/prisma"

const PREFIX = "par"
const YEAR = new Date().getFullYear()

export async function generateSerial(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]
) {
  const startOfYear = new Date(`${YEAR}-01-01T00:00:00.000Z`)

  const count = await tx.certificate.count({
    where: { issuedAt: { gte: startOfYear } },
  })

  const next = count + 1
  const padded = next.toString().padStart(4, "0")

  return `${PREFIX}-${YEAR}-${padded}`
}
