"use client";
import BookLoader from "@/lib/BookLoader";
import { persistor, store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<BookLoader />} persistor={persistor}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{ zIndex: 999999 }}
          toastOptions={{
            style: {
              zIndex: 999999,
            },
          }}
        />
        {children}
      </PersistGate>
    </Provider>
  );
}
