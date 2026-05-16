import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import compress from "redux-persist-transform-compress"; // Added for compression
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { api } from "./api/apiSlice";
import { rootReducer } from "./rootReducer";

const createNoopStorage = () => ({
    getItem(key) {
        return Promise.resolve(null);
    },
    setItem(key, value) {
        try {
            return Promise.resolve(localStorage.setItem(key, value));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                console.error("Storage quota exceeded! Clearing the key:", key);
                localStorage.removeItem(key); // Handle the error by clearing the item
            }
            return Promise.resolve(null);
        }
    },
    removeItem(key) {
        return Promise.resolve(localStorage.removeItem(key));
    },
});

const checkStorage =
    typeof window !== "undefined"
        ? createWebStorage("session") // Use 'session' for sessionStorage if needed
        : createNoopStorage();

const persistConfig = {
    key: "root",
    storage: checkStorage,
    whitelist: ["auth"], // Only persist the auth slice
    transforms: [compress()], // Compress the persisted state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }).concat(api.middleware),
// });

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(api.middleware),
});

export const persistor = persistStore(store);


