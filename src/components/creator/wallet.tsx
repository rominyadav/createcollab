"use client";

import { useState } from "react";

import { Eye, EyeOff, TrendingUp, Wallet as WalletIcon } from "lucide-react";

import {
  getCreatorWallet,
  getTotalPendingAmount,
  mockCreatorWallets,
} from "@/components/mock-data/creator-wallet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PayoutSection } from "./wallet/payout-section";

interface WalletProps {
  creatorId?: string;
}

export function Wallet({ creatorId }: WalletProps) {
  const [showBalance, setShowBalance] = useState(true);

  const wallet = getCreatorWallet(creatorId!);

  if (!wallet) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">💫</div>
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            No Wallet Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete campaigns to start earning.
          </p>
        </div>
      </div>
    );
  }
  const totalPendingAmount = getTotalPendingAmount(wallet);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "received":
        return "💰";
      case "payout":
        return "📤";
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

  return (
    <div className="pb-20 md:pb-8">
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
                  ? `NPR ${wallet.availableBalance.toLocaleString()}`
                  : "NPR ****"}
              </p>
              {wallet.processingBalance > 0 && (
                <p className="text-sm text-emerald-100">
                  Processing: NPR {wallet.processingBalance.toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>
                  Total Earned:{" "}
                  {showBalance
                    ? `NPR ${wallet.totalEarnings.toLocaleString()}`
                    : "NPR ****"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments Section */}
        {wallet.pendingPayments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⏳</span>
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wallet.pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {payment.campaignName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payment.brandName} • Completed{" "}
                        {new Date(payment.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-700 dark:text-yellow-300">
                        NPR {payment.amount.toLocaleString()}
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        Awaiting Payment
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Total Pending: NPR {totalPendingAmount.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">📊</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Available
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                NPR {wallet.availableBalance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">⏳</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                NPR {totalPendingAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payout Section */}
        <PayoutSection totalBalance={wallet.availableBalance} />

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wallet.transactionHistory.map((transaction) => (
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
                    {transaction.brandName && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {transaction.brandName}
                        {transaction.campaignId &&
                          ` • Campaign ${transaction.campaignId}`}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        transaction.type === "received"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.type === "received" ? "+" : "-"}
                      NPR {transaction.amount.toLocaleString()}
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
