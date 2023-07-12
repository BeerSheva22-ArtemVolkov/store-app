import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { authReducer } from './slices/authSlice'
import { useSelector } from 'react-redux';
import UserDataType from '../model/UserDataType';

export const store = configureStore({
    reducer: {
        cartState: cartReducer,
        authState: authReducer
    }
})

export function useSelectorAuth() {
    return useSelector<any, UserDataType>(state => state.authState.userData);
}