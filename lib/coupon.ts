"use server"

import { prisma } from "@/prisma/prisma"

export const getCouponByCode = async (code: string) => {
  return await prisma.coupon.findFirst({ where: { code } })
}
