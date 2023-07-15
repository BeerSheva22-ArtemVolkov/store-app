import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { authReducer } from './slices/authSlice'
import { useSelector } from 'react-redux';
import UserDataType from '../model/UserDataType';
import ProductType from '../model/ProductType';
import CartItemType from '../model/CartItemType';
import CodePayloadType from '../model/CodePayloadType';
import { codeReducer } from './slices/codeSlice';

export const store = configureStore({
    reducer: {
        cartState: cartReducer,
        authState: authReducer,
        codeState: codeReducer
    }
})

export function useSelectorAuth() {
    return useSelector<any, UserDataType>(state => state.authState.userData);
}

export function useSelectorCart() {
    return useSelector<any, ProductType[]>(state => state.cartState.cartItems)
}

export function useSelectorCode() {
    return useSelector<any, CodePayloadType>(state => state.codeState.codeMessage);
}
