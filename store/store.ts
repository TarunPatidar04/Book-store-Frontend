import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
} from "redux-persist";
import useReducer from "./slice/userSlice";
import { api } from "./api";
// persist configuration for  user data  save the data in Local storage
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isEmailVerified", "isLoggedIn"], // only these will be persisted
};

// wrap your reducers with persistConfig

const persistUserReducer = persistReducer(userPersistConfig, useReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, //rtk query api reducer
    user: persistUserReducer, // persisted user reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware), // adding rtk query api middleware
});

setupListeners(store.dispatch); // setup listeners for RTK query

// persistor for the store

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch