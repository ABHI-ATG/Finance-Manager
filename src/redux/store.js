import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  finance: financeReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
