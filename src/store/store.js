import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import globalReducer from "./globalSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, globalReducer);

const store = configureStore({
    reducer: {
        global: persistedReducer,
    },
    middleware: [thunk],
});

setupListeners(store.dispatch);

export default store;

