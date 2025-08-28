"use client";

import { useState } from "react";

import {
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Smartphone,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Transaction {
  id: number;
  type: "earning" | "payout" | "bonus";
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  campaignTitle?: string;
  brandName?: string;
}

interface WalletProps {
  creatorId: number;
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "earning",
    amount: 5000,
    currency: "NPR",
    description: "Campaign completion payment",
    date: "2024-01-25",
    status: "completed",
    campaignTitle: "Summer Fashion Collection",
    brandName: "StyleHub Fashion",
  },
  {
    id: 2,
    type: "earning",
    amount: 8000,
    currency: "NPR",
    description: "Campaign completion payment",
    date: "2024-01-20",
    status: "completed",
    campaignTitle: "Tech Product Review",
    brandName: "TechCorp Inc.",
  },
  {
    id: 3,
    type: "payout",
    amount: -10000,
    currency: "NPR",
    description: "Payout to Khalti",
    date: "2024-01-18",
    status: "completed",
  },
  {
    id: 4,
    type: "bonus",
    amount: 500,
    currency: "NPR",
    description: "Performance bonus",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 5,
    type: "earning",
    amount: 3500,
    currency: "NPR",
    description: "Campaign completion payment",
    date: "2024-01-10",
    status: "pending",
    campaignTitle: "Healthy Lifestyle Challenge",
    brandName: "FitLife App",
  },
];

export function Wallet({ creatorId }: WalletProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "khalti" | "esewa"
  >("khalti");

  const totalBalance = 15750;
  const pendingEarnings = 3500;
  const totalEarnings = mockTransactions
    .filter((t) => t.type === "earning" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earning":
        return "💰";
      case "payout":
        return "📤";
      case "bonus":
        return "🎁";
      default:
        return "💳";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const handlePayout = () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) return;

    const amount = parseFloat(payoutAmount);
    if (amount > totalBalance) {
      alert("Insufficient balance");
      return;
    }

    // In real app, this would call the payout API
    console.log(`Payout ${amount} NPR to ${selectedPaymentMethod}`);
    setPayoutAmount("");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Wallet
        </h1>
      </div>

      <div className="space-y-6 p-4">
        {/* Balance Card */}
        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Available Balance</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20"
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-3xl font-bold">
                {showBalance
                  ? `NPR ${totalBalance.toLocaleString()}`
                  : "NPR ****"}
              </p>
              <p className="text-sm text-emerald-100">
                Pending: NPR {pendingEarnings.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Total Earned: NPR {totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">📊</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This Month
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                NPR {(totalEarnings * 0.6).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">🎯</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Campaigns
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {mockTransactions.filter((t) => t.type === "earning").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payout Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount (NPR)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                max={totalBalance}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Available: NPR {totalBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={
                    selectedPaymentMethod === "khalti" ? "default" : "outline"
                  }
                  onClick={() => setSelectedPaymentMethod("khalti")}
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  Khalti
                </Button>
                <Button
                  variant={
                    selectedPaymentMethod === "esewa" ? "default" : "outline"
                  }
                  onClick={() => setSelectedPaymentMethod("esewa")}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  eSewa
                </Button>
              </div>
            </div>

            <Button
              onClick={handlePayout}
              disabled={!payoutAmount || parseFloat(payoutAmount) <= 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Request Payout
            </Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-slate-600"
                >
                  <div className="text-2xl">
                    {getTransactionIcon(transaction.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    {transaction.campaignTitle && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {transaction.campaignTitle} • {transaction.brandName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        transaction.amount > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.currency}{" "}
                      {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge
                      className={getStatusColor(transaction.status)}
                      variant="outline"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
