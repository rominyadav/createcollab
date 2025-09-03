"use client";

import { useState } from "react";

import {
  CreditCard,
  Eye,
  EyeOff,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BrandWalletProps {
  brandId: number;
}

interface Transaction {
  id: string;
  type: "deposit" | "payment" | "withdrawal";
  amount: number;
  status: "completed" | "pending" | "failed";
  description: string;
  date: string;
  creatorName?: string;
  campaignId?: string;
}

interface PendingPayment {
  id: string;
  creatorName: string;
  campaignName: string;
  amount: number;
  dueDate: string;
  status: "pending" | "overdue";
}

const mockWalletData = {
  balance: 125000,
  pendingPayments: 45000,
  totalSpent: 280000,
  transactions: [
    {
      id: "txn_001",
      type: "deposit" as const,
      amount: 50000,
      status: "completed" as const,
      description: "Bank transfer deposit",
      date: "2024-01-15T10:30:00Z",
    },
    {
      id: "txn_002",
      type: "payment" as const,
      amount: 5000,
      status: "completed" as const,
      description: "Campaign payment to creator",
      date: "2024-01-14T14:20:00Z",
      creatorName: "Sarah Johnson",
      campaignId: "1",
    },
    {
      id: "txn_003",
      type: "payment" as const,
      amount: 8000,
      status: "pending" as const,
      description: "Campaign payment to creator",
      date: "2024-01-13T16:45:00Z",
      creatorName: "Emma Wilson",
      campaignId: "2",
    },
  ] as Transaction[],
  pendingPaymentsList: [
    {
      id: "pending_001",
      creatorName: "Raj Sharma",
      campaignName: "Food Campaign Q1",
      amount: 12000,
      dueDate: "2024-01-20",
      status: "pending" as const,
    },
    {
      id: "pending_002",
      creatorName: "Priya Shrestha",
      campaignName: "Beauty Product Launch",
      amount: 6500,
      dueDate: "2024-01-18",
      status: "overdue" as const,
    },
  ] as PendingPayment[],
};

export function BrandWallet({ brandId }: BrandWalletProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bank");

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "💰";
      case "payment":
        return "📤";
      case "withdrawal":
        return "🏦";
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
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const handleDeposit = () => {
    console.log("Depositing:", depositAmount, "via", selectedPaymentMethod);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    console.log("Withdrawing:", withdrawAmount, "via", selectedPaymentMethod);
    setWithdrawAmount("");
  };

  const handlePayCreator = (paymentId: string) => {
    console.log("Paying creator:", paymentId);
  };

  return (
    <div className="pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Brand Wallet
        </h1>
      </div>

      <div className="space-y-6 p-4">
        {/* Balance Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
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
                  ? `NPR ${mockWalletData.balance.toLocaleString()}`
                  : "NPR ****"}
              </p>
              <p className="text-sm text-blue-100">
                Pending Payments: NPR{" "}
                {mockWalletData.pendingPayments.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                <span>
                  Total Spent:{" "}
                  {showBalance
                    ? `NPR ${mockWalletData.totalSpent.toLocaleString()}`
                    : "NPR ****"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        {mockWalletData.pendingPaymentsList.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⏰</span>
                Pending Creator Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWalletData.pendingPaymentsList.map((payment) => (
                  <div
                    key={payment.id}
                    className={`flex items-center justify-between rounded-lg border p-3 ${
                      payment.status === "overdue"
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                        : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {payment.creatorName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payment.campaignName} • Due:{" "}
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          NPR {payment.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status === "overdue"
                            ? "Overdue"
                            : "Due Soon"}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handlePayCreator(payment.id)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount">Amount (NPR)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="10000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deposit-method">Payment Method</Label>
                <select
                  id="deposit-method"
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
              <Button
                onClick={handleDeposit}
                disabled={!depositAmount}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Withdraw Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Amount (NPR)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="5000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="withdraw-method">Withdrawal Method</Label>
                <select
                  id="withdraw-method"
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                </select>
              </div>
              <Button
                onClick={handleWithdraw}
                disabled={
                  !withdrawAmount ||
                  parseInt(withdrawAmount) > mockWalletData.balance
                }
                variant="outline"
                className="w-full"
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">💰</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Available
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                NPR {mockWalletData.balance.toLocaleString()}
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
                NPR {mockWalletData.pendingPayments.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-2 text-2xl">📊</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Spent
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                NPR {mockWalletData.totalSpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {mockWalletData.transactions.map((transaction) => (
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
                      {transaction.creatorName && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          To: {transaction.creatorName}
                          {transaction.campaignId &&
                            ` • Campaign #${transaction.campaignId}`}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          transaction.type === "deposit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}
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
              </TabsContent>

              <TabsContent value="deposits">
                {mockWalletData.transactions
                  .filter((t) => t.type === "deposit")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-slate-600"
                    >
                      <div className="text-2xl">💰</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          +NPR {transaction.amount.toLocaleString()}
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
              </TabsContent>

              <TabsContent value="payments">
                {mockWalletData.transactions
                  .filter((t) => t.type === "payment")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-slate-600"
                    >
                      <div className="text-2xl">📤</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        {transaction.creatorName && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            To: {transaction.creatorName}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600 dark:text-red-400">
                          -NPR {transaction.amount.toLocaleString()}
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
              </TabsContent>

              <TabsContent value="withdrawals">
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No withdrawal transactions found
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
