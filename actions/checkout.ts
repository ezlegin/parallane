"use server"

import { CheckoutFormType } from "@/lib/formSchema"
import { incrementString } from "@/lib/incrementString"
import { prisma } from "@/prisma/prisma"
import { requestPayment } from "./yekPay"
import { MembershipPeriod } from "@/prisma/generated/prisma/enums"

interface UserData extends CheckoutFormType {
  country: string
}

interface PaymentData {
  discountAmount: number
  paidAmount: number
  totalAmount: number
  discountCode: string | null
  period: MembershipPeriod
}

export const startPayment = async (
  userData: UserData,
  paymentData: PaymentData,
  userId: string
) => {
  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phoneNumber,
    postalCode,
  } = userData

  const { discountAmount, paidAmount, totalAmount, discountCode, period } =
    paymentData

  try {
    const user = await prisma.user.update({
      omit: { password: true },
      where: { id: userId },
      data: {
        name: `${firstName} ${lastName}`,
        address,
        city,
        country,
        phoneNumber,
        postalCode,
        isOnboardingCompleted: true,
      },
    })

    const existingCoupon = discountCode
      ? await prisma.coupon.findFirst({ where: { code: discountCode } })
      : null

    const lastPayment = await prisma.payment.findFirst({
      orderBy: { createdAt: "desc" },
    })

    const newPayment = await prisma.payment.create({
      data: {
        discountAmount,
        paidAmount,
        reference: incrementString(lastPayment?.reference),
        totalAmount,
        userId,
        discountCode,
        discountType: existingCoupon?.discountType,
      },
    })

    const res = await requestPayment({
      user,
      address,
      city,
      country,
      email: user.email!,
      firstName,
      lastName,
      mobile: phoneNumber || "",
      orderNumber: newPayment.id.toString(),
      amount: paidAmount,
      postalCode: postalCode || "",
      plan: period,
    })

    if (res?.success && res.authority && res.paymentUrl) {
      await prisma.payment.update({
        where: { id: newPayment.id },
        data: { authority: res.authority },
      })
    } else {
      await prisma.payment.update({
        where: { id: newPayment.id },
        data: { status: "failed" },
      })

      return { error: "Something Happened, Please try again later." }
    }

    return {
      success: "You will be redicted to gateway page.",
      paymentUrl: res.paymentUrl,
    }
  } catch (error) {
    console.error(error)
    return { error: "Something Happende. Please try again later." }
  }
}
