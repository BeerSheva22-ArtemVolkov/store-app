import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { authReducer } from './slices/authSlice'
import { useSelector } from 'react-redux';
import UserDataType from '../model/UserDataType';
import ProductType from '../model/ProductType';
import CartItemType from '../model/CartItemType';

export const store = configureStore({
    reducer: {
        cartState: cartReducer,
        authState: authReducer
    }
})

export function useSelectorAuth() {
    return useSelector<any, UserDataType>(state => state.authState.userData);
}

export function useSelectorCart() {
    return useSelector<any, ProductType[]>(state => state.cartState.cartItems)
}

