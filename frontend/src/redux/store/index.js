import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../slice/userSlice';
import storeReducer from "../slice/storeSlice"

export const store = configureStore({
    reducer: {
        userDetail: userDetailReducer,
        store: storeReducer
    }
});