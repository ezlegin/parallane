"use server"

import { prisma } from "@/prisma/prisma"

export async function searchPayments(query: string) {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        reference: {
          contains: query,
        },
      },
      select: {
        id: true,
        reference: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    })

    return { payments }
  } catch (error) {
    return { error: (error as Error).message }
  }
}
