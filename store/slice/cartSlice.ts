import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/types/type";

export interface CartState {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

const initialState: CartState = {
  _id: "",
  userId: "",
  items: [],
  createdAt: "",
  updatedAt: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    addToCart: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    clearCart: () => initialState,
  },
}); 

export const { setCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
