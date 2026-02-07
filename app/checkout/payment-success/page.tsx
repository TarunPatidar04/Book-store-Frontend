"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="font-mono font-medium text-foreground break-all">
            {orderId || "N/A"}
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Link href="/account/orders" className="w-full block">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              View Order Details
            </Button>
          </Link>
          <Link href="/books" className="w-full block">
            <Button variant="outline" className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default Page;
