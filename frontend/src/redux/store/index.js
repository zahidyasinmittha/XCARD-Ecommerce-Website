import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../slice/userSlice';

export const store = configureStore({
    reducer: {
        userDetail: userDetailReducer
    }
});