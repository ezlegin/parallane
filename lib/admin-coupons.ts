export type CouponType = "fixed" | "percentage"

export type AdminCoupon = {
  id: string
  code: string
  type: CouponType
  amount: number
  expiresAt: string
  usageLimit: number
  usageCount: number
  summary: string
}

export const adminCoupons: AdminCoupon[] = [
  {
    id: "coupon_001",
    code: "YOUTUBE10",
    type: "percentage",
    amount: 10,
    expiresAt: "October 31, 2026",
    usageLimit: 100,
    usageCount: 42,
    summary: "10% off membership for YouTube viewers.",
  },
  {
    id: "coupon_002",
    code: "WELCOME5",
    type: "fixed",
    amount: 5,
    expiresAt: "November 30, 2026",
    usageLimit: 50,
    usageCount: 18,
    summary: "$5 off for new members.",
  },
  {
    id: "coupon_003",
    code: "LAUNCH20",
    type: "percentage",
    amount: 20,
    expiresAt: "September 30, 2026",
    usageLimit: 200,
    usageCount: 156,
    summary: "Launch promotion for the first 200 members.",
  },
  {
    id: "coupon_004",
    code: "EARLY10",
    type: "fixed",
    amount: 10,
    expiresAt: "December 31, 2026",
    usageLimit: 25,
    usageCount: 7,
    summary: "$10 discount for early supporters.",
  },
]

export function getAdminCoupon(id: string) {
  return adminCoupons.find((coupon) => coupon.id === id)
}
