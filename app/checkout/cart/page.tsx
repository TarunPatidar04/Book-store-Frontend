"use client";
import NoData from "@/app/components/NoData";
import {
  useAddToWishlistMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useRemoveFromWishlistMutation,
} from "@/store/api";
import { setCart } from "@/store/slice/cartSlice";
import { toggleLoginDialog } from "@/store/slice/userSlice";
import {
  addWishlistAction,
  removeWishlistAction,
} from "@/store/slice/wishlistSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { orderId, step } = useSelector((state: RootState) => state.checkout);
  const wishlist = useSelector((state: RootState) => state.wishlist.item);
  const cart = useSelector((state: RootState) => state.cart);

  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery(
    user?._id,
  );

  const [removeCartMutation] = useRemoveFromCartMutation();
  const [addToWishlistMutation] = useAddToWishlistMutation();
  const [removeWishlistMutation] = useRemoveFromWishlistMutation();

  useEffect(() => {
    if (cartData?.success && cartData?.data) {
      dispatch(setCart(cartData?.data));
    }
  }, [cartData, dispatch]);

  const handleRemoveItem = async (productId: string) => {
    try {
      const result = await removeCartMutation(productId).unwrap();
      if (result.success) {
        dispatch(setCart(result.data));
        toast.success(result.message || "Book removed from cart");
      } else {
        toast.error(result.message || "Failed to remove book from cart");
      }
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Failed to remove book from cart");
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const isWishlist = wishlist.some((item) =>
        item.products.includes(productId),
      );
      if (isWishlist) {
        const result = await removeWishlistMutation(productId).unwrap();
        if (result.success) {
          dispatch(removeWishlistAction(productId));
          toast.success(result.message || "Book removed from wishlist");
        } else {
          toast.error(result.message || "Failed to remove book from wishlist");
        }
      } else {
        const result = await addToWishlistMutation(productId).unwrap();
        if (result.success) {
          dispatch(addWishlistAction(result.data));
          toast.success(result.message || "Book added to wishlist");
        } else {
          toast.error(result.message || "Failed to add book to wishlist");
        }
      }
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(
        error?.data?.message || "Failed to remove book from wishlist",
      );
    }
  };

  const handleOpenLogin = () => {
    dispatch(toggleLoginDialog());
  };

  if (!user) {
    return (
      <NoData
        message="Please log in to access your cart."
        description="You need to be logged in to view your cart and checkout."
        buttonText="Login"
        imageUrl="/images/login.jpg"
        onClick={handleOpenLogin}
      />
    );
  }

  if (cart.items.length === 0) {
    return (
      <NoData
        message="Your cart is empty."
        description="Looks like you haven't added any items yet. 
            Explore our collection and find something you love!"
        buttonText="Browse Books"
        imageUrl="/images/cart.webp"
        onClick={() => router.push("/books")}
      />
    );
  }

  return <div></div>;
};

export default page;
