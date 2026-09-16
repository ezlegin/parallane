export type DiscountType = "fixed" | "percentage"

export type AdminPayment = {
  id: string
  user: {
    name: string
    email: string
  }
  discountCode: string | null
  discountAmount: number
  discountType: DiscountType | null
  total: number
  totalPaid: number
  paidAt: string
}

export const adminPayments: AdminPayment[] = [
  {
    id: "pay_001",
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    discountCode: "YOUTUBE10",
    discountAmount: 10,
    discountType: "percentage",
    total: 29,
    totalPaid: 26.1,
    paidAt: "September 16, 2026",
  },
  {
    id: "pay_002",
    user: {
      name: "Michael Chen",
      email: "michael@example.com",
    },
    discountCode: null,
    discountAmount: 0,
    discountType: null,
    total: 29,
    totalPaid: 29,
    paidAt: "September 16, 2026",
  },
  {
    id: "pay_003",
    user: {
      name: "Emma Williams",
      email: "emma@example.com",
    },
    discountCode: "WELCOME5",
    discountAmount: 5,
    discountType: "fixed",
    total: 29,
    totalPaid: 24,
    paidAt: "September 15, 2026",
  },
  {
    id: "pay_004",
    user: {
      name: "David Miller",
      email: "david@example.com",
    },
    discountCode: "YOUTUBE10",
    discountAmount: 10,
    discountType: "percentage",
    total: 29,
    totalPaid: 26.1,
    paidAt: "September 15, 2026",
  },
  {
    id: "pay_005",
    user: {
      name: "Olivia Brown",
      email: "olivia@example.com",
    },
    discountCode: "LAUNCH20",
    discountAmount: 20,
    discountType: "percentage",
    total: 29,
    totalPaid: 23.2,
    paidAt: "September 14, 2026",
  },
  {
    id: "pay_006",
    user: {
      name: "James Anderson",
      email: "james@example.com",
    },
    discountCode: null,
    discountAmount: 0,
    discountType: null,
    total: 29,
    totalPaid: 29,
    paidAt: "September 13, 2026",
  },
]

export function getAdminPayment(id: string) {
  return adminPayments.find((payment) => payment.id === id)
}
