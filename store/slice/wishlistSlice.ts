import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  _id: string;
  products: string[];
}

interface WishlistState {
  item: WishlistItem[];
}

const initialState: WishlistState = {
  item: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<any>) => {
      return { ...state.item, ...action.payload };
    },

    clearWishlist: (state) => {
      state.item = [];
    },

    addWishlistAction: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.item.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (existingItem !== -1) {
        state.item[existingItem] = action.payload;
      } else {
        state.item.push(action.payload);
      }
    },
    removeWishlistAction: (state, action: PayloadAction<string>) => {
      state.item = state.item
        .map((item) => ({
          ...item,
          products: item.products.filter(
            (product) => product !== action.payload,
          ),
        }))
        .filter((item) => item.products.length > 0);
    },
  },
});

export const { addWishlistAction, removeWishlistAction } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
