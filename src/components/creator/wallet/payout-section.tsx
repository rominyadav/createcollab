"use client";

import { useState } from "react";

import { CreditCard, Download, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PayoutSectionProps {
  totalBalance: number;
}

export function PayoutSection({ totalBalance }: PayoutSectionProps) {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "khalti" | "esewa"
  >("khalti");

  const handlePayout = () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) return;

    const amount = parseFloat(payoutAmount);
    if (amount > totalBalance) {
      alert("Insufficient balance");
      return;
    }

    console.log(`Payout ${amount} NPR to ${selectedPaymentMethod}`);
    setPayoutAmount("");
  };

  return (
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
  );
}
