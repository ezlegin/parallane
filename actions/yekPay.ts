"use server"

import { MembershipPeriod, User } from "@/prisma/generated/prisma/client"
import axios from "axios"

const environment =
  process.env.NODE_ENV === "development" ? "sandbox" : "production"

interface PurchaseParams {
  user: Omit<User, "password">
  amount: number
  orderNumber: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  address: string
  postalCode: string
  country: string
  city: string
  plan: MembershipPeriod
}

const paymentProxyUrl = process.env.PAYMENT_PROXY_URL
const paymentProxySecret = process.env.PAYMENT_PROXY_SECRET

const paymentHeaders = {
  Authorization: `Bearer ${paymentProxySecret}`,
}

export async function requestPayment(params: PurchaseParams) {
  const {
    user,
    amount,
    orderNumber,
    firstName,
    lastName,
    email,
    mobile,
    address,
    postalCode,
    country,
    city,
    plan,
  } = params

  try {
    const response = await axios.post(
      `${paymentProxyUrl}/request`,
      {
        environment,
        amount: amount.toFixed(2),
        fromCurrencyCode: "978",
        toCurrencyCode: "978",
        orderNumber,

        callback:
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/api/payment-result?plan=${plan}`
            : `https://parallane.com/api/payment-result?plan=${plan}`,

        firstName,
        lastName,
        email,
        mobile,
        address,
        postalCode,
        country,
        city,

        description: `Payment Id: ${orderNumber} - User Id: ${user.id}`,
      },
      {
        headers: paymentHeaders,
      }
    )

    const data = response.data

    if (data.Code === 100 && data.Authority) {
      const paymentUrl =
        (process.env.NODE_ENV === "development"
          ? "https://api.ypsapi.com/api/sandbox/payment/"
          : `https://gate.ypsapi.com/api/payment/start/`) + data.Authority

      return {
        success: true,
        paymentUrl,
        authority: data.Authority,
      }
    }

    return {
      success: false,
      error: data.Description || "Unknown error from YekPay API",
      code: data.Code,
    }
  } catch (error: any) {
    console.error(error.response?.data || error.message)

    return {
      success: false,
      error: error.response?.data || error.message,
    }
  }
}

export async function verifyPayment(authority: string) {
  if (!authority) {
    return {
      error: "Authority is needed",
    }
  }

  try {
    const response = await axios.post(
      `${paymentProxyUrl}/verify`,
      {
        authority,
        environment,
      },
      {
        headers: paymentHeaders,
      }
    )

    const data = response.data

    if (data.Code === 100) {
      return {
        success: true,
        authority,
      }
    }

    return {
      success: false,
      error: data.Description || "Unknown error from YekPay API",
      code: data.Code,
    }
  } catch (error: any) {
    console.error(error.response?.data || error.message)

    return {
      error: error.response?.data || error.message,
    }
  }
}
