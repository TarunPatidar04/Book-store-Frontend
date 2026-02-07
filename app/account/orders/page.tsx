"use client";

import { useGetUserOrdersQuery } from "@/store/api";
import { Loader2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoData from "@/app/components/NoData";

const OrdersPage = () => {
  const { data: orderData, isLoading, error } = useGetUserOrdersQuery({});

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  const orders = orderData?.data || [];

  if (orders.length === 0) {
    return (
      <NoData
        message="No orders found"
        description="You haven't placed any orders yet."
        buttonText="Browse Books"
        imageUrl="/images/empty-cart.png" // Using empty-cart image for now
        onClick={() => (window.location.href = "/books")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Package className="h-6 w-6 text-blue-600" />
          My Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          View and track your order history
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <Card key={order._id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 flex flex-row items-center justify-between pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="font-mono text-xs font-medium">
                  {order._id}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-muted-foreground">
                  Total Amount: ₹{order.totalAmount}
                </span>
                <Badge
                  variant={
                    order.status === "DELIVERED"
                      ? "default" // shadcn default is often black/primary
                      : order.status === "CANCELLED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="h-16 w-16 relative shrink-0 overflow-hidden rounded-md border">
                      {/* Handle potential multiple images or single string */}
                      <Image
                        src={
                          Array.isArray(item.product.images) &&
                          item.product.images.length > 0
                            ? item.product.images[0]
                            : "/images/book-placeholder.png"
                        }
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
