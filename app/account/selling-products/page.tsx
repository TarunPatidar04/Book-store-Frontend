"use client";

import {
  useGetProductsBySelletIdQuery,
  useDeleteProductByIdMutation,
} from "@/store/api";
import { RootState } from "@/store/store";
import { Loader2, PiggyBank, Pencil, Trash2, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import NoData from "@/app/components/NoData";

const SellingProductsPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsBySelletIdQuery(user?._id ?? "", {
    skip: !user?._id,
  });

  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductByIdMutation();

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

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
        Failed to load your products. Please try again later.
      </div>
    );
  }

  const products = productsData?.data || [];

  if (products.length === 0) {
    return (
      <NoData
        message="No selling products found"
        description="You haven't listed any books for sale yet."
        buttonText="Sell a Book"
        imageUrl="/images/empty-box.png" // Placeholder or reuse existing
        onClick={() => (window.location.href = "/book-sell")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-blue-600" />
            My Selling Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage books you are selling
          </p>
        </div>
        <Link href="/book-sell">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Sell New Book
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product: any) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={
                      Array.isArray(product.images) && product.images.length > 0
                        ? product.images[0]
                        : "/images/book-placeholder.png"
                    }
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.author}
                    </p>
                    <div className="flex items-center mt-1 font-medium text-green-600">
                      <IndianRupee className="w-4 h-4" />
                      {product.finalPrice}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    {/* Edit functionality might be complex to implement immediately, maybe just a placeholder or link if edit page exists */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast("Edit functionality coming soon!")}
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellingProductsPage;
