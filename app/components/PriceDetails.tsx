import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CreditCard, Shield } from "lucide-react";
import React from "react";

interface PriceDetailsProps {
  totalOriginalAmount: number;
  totalDiscount: number;
  totalAmount: number;
  itemCount: number;
  shippingCharge: number;
  isProcessing: boolean;
  step: "cart" | "address" | "payment";
  onProceed: () => void;
  onBack: () => void;
}

const PriceDetails = ({
  totalOriginalAmount,
  totalDiscount,
  totalAmount,
  itemCount,
  shippingCharge,
  isProcessing,
  step,
  onProceed,
  onBack,
}: PriceDetailsProps) => {
  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Price Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Price ({itemCount} items)</span>
            <span>₹{totalOriginalAmount}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{totalDiscount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span
              className={`${shippingCharge === 0 ? "text-green-600" : "text-black"}`}
            >
              {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
            </span>
          </div>
          <div className="flex justify-between border-t-2 font-medium pt-4">
            <span>Total Amount</span>
            <span className="">₹{totalAmount}</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={onProceed}
            size={"lg"}
            disabled={isProcessing || itemCount === 0}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              +"Processing..."
            ) : step === "payment" ? (
              <>
                <CreditCard className="mr-2 h-4 w-4" /> Continue to Pay
              </>
            ) : (
              <>
                <ChevronRight className="mr-2 h-4 w-4" />
                {step === "cart" ? "Proceed to Checkout" : "Confirm Address"}
              </>
            )}
          </Button>

          {step !== "cart" && (
            <Button
              onClick={onBack}
              size={"lg"}
              variant={"outline"}
              className="w-full"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <p>100% Secure Payment</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default PriceDetails;
