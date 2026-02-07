"use client";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "@/store/api";
import { RootState } from "@/store/store";
import {
  Loader2,
  Heart,
  Trash2,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import NoData from "@/app/components/NoData";
import { setCart } from "@/store/slice/cartSlice";

const WishlistPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const {
    data: wishlistData,
    isLoading,
    error,
  } = useGetWishlistQuery(user?._id ?? "", {
    skip: !user?._id,
  });

  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId).unwrap();
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = async (product: any) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      const result = await addToCart({
        userId: user._id,
        productId: product._id,
        quantity: 1,
      }).unwrap();

      if (result.success) {
        dispatch(setCart(result.data));
        toast.success("Added to cart");
        // Optionally remove from wishlist after adding to cart
        // await removeFromWishlist(product._id).unwrap();
      }
    } catch (error) {
      toast.error("Failed to add to cart");
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
        Failed to load your wishlist. Please try again later.
      </div>
    );
  }

  const wishlistItems = wishlistData?.data?.products || [];

  if (wishlistItems.length === 0) {
    return (
      <NoData
        message="Your wishlist is empty"
        description="Save books you like to your wishlist"
        buttonText="Browse Books"
        imageUrl="/images/empty-wishlist.png" // Placeholder
        onClick={() => (window.location.href = "/books")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-1">Your saved books</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((product: any) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <CardContent className="p-0">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? product.images[0]
                      : "/images/book-placeholder.png"
                  }
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white text-red-500 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center font-bold text-lg text-gray-900">
                    <IndianRupee className="w-4 h-4" />
                    {product.finalPrice}
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleAddToCart(product)}
                    disabled={isAddingToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
