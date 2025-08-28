export interface CreatorWallet {
  creatorId: string;
  creatorName: string;
  availableBalance: number; // Total available = ready for immediate payout
  pendingPayments: PendingPayment[]; // Completed campaigns awaiting brand payment
  processingBalance: number; // Payout initiated, waiting confirmation
  totalEarnings: number; // Historical total
  transactionHistory: Transaction[];
}

export interface PendingPayment {
  id: string;
  amount: number;
  campaignId: string;
  campaignName: string;
  brandName: string;
  completedDate: string;
  description: string;
}

export interface Transaction {
  id: string;
  type: "received" | "payout";
  amount: number;
  status: "completed" | "pending" | "processing" | "failed";
  description: string;
  brandName?: string; // For received payments
  date: string;
  campaignId?: string;
}

export const mockCreatorWallets: CreatorWallet[] = [
  {
    creatorId: "3",
    creatorName: "Emma Wilson",
    availableBalance: 12000.0,
    pendingPayments: [
      {
        id: "pending_002",
        amount: 6500.0,
        campaignId: "5",
        campaignName: "Beauty Product Launch",
        brandName: "GlowUp Cosmetics",
        completedDate: "2024-01-14T12:00:00Z",
        description: "Beauty campaign completed, payment pending",
      },
    ],
    processingBalance: 3000.0,
    totalEarnings: 23000.0, // 12000 + 3000 + 8000 (excluding pending 6500)
    transactionHistory: [
      {
        id: "txn_003",
        type: "payout",
        amount: 3000.0,
        status: "processing",
        description: "Withdrawal to bank account",
        date: "2024-01-15T16:30:00Z",
      },
      {
        id: "txn_004",
        type: "received",
        amount: 8000.0,
        status: "completed",
        description: "Lifestyle campaign payment",
        brandName: "Various Brands",
        date: "2024-01-12T09:20:00Z",
      },
    ],
  },
  {
    creatorId: "4",
    creatorName: "Raj Sharma",
    availableBalance: 8200.0,
    pendingPayments: [
      {
        id: "pending_003",
        amount: 4200.0,
        campaignId: "4",
        campaignName: "Food Delivery Service Promotion",
        brandName: "QuickBite Delivery",
        completedDate: "2024-01-13T14:45:00Z",
        description: "Food campaign completed successfully",
      },
    ],
    processingBalance: 0.0,
    totalEarnings: 12200.0, // 8200 + 4000 (excluding pending 4200)
    transactionHistory: [
      {
        id: "txn_005",
        type: "received",
        amount: 4200.0,
        status: "completed",
        description: "Food delivery campaign payment",
        brandName: "QuickBite Delivery",
        date: "2024-01-10T11:45:00Z",
        campaignId: "4",
      },
      {
        id: "txn_006",
        type: "payout",
        amount: 4000.0,
        status: "completed",
        description: "Withdrawal to bank account",
        date: "2024-01-05T10:15:00Z",
      },
    ],
  },
  {
    creatorId: "5",
    creatorName: "Priya Shrestha",
    availableBalance: 6800.0,
    pendingPayments: [
      {
        id: "pending_004",
        amount: 6500.0,
        campaignId: "5",
        campaignName: "Beauty Product Launch",
        brandName: "GlowUp Cosmetics",
        completedDate: "2024-01-16T11:30:00Z",
        description: "Beauty campaign completed successfully",
      },
    ],
    processingBalance: 2100.0,
    totalEarnings: 13400.0, // 6800 + 2100 + 4500 (excluding pending 6500)
    transactionHistory: [
      {
        id: "txn_007",
        type: "payout",
        amount: 2100.0,
        status: "processing",
        description: "Withdrawal to eSewa",
        date: "2024-01-15T13:45:00Z",
      },
      {
        id: "txn_008",
        type: "received",
        amount: 4500.0,
        status: "completed",
        description: "Beauty tutorial payment",
        brandName: "Beauty Brands",
        date: "2024-01-12T10:20:00Z",
      },
    ],
  },
];

// Helper functions
export const getCreatorWallet = (
  creatorId: string
): CreatorWallet | undefined => {
  return mockCreatorWallets.find((wallet) => wallet.creatorId === creatorId);
};

export const getTotalPendingAmount = (wallet: CreatorWallet): number => {
  return wallet.pendingPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );
};
