import { createSlice } from "@reduxjs/toolkit";
import ProductType from "../../model/ProductType";
import CartItemType from "../../model/CartItemType";

const initialState: { cartItems: ProductType[] } = { cartItems: [] }

const slice = createSlice({
    initialState: initialState,
    name: 'cartState',
    // reducers - объект с действиями (actions) для данного slice-а 
    reducers: {
        // state - предыдущее состояние, data - данные
        addToCart: (state, data) => {
            console.log(data);

            const cartItem = state.cartItems.find(item => item.id === data.payload.id)
            console.log(cartItem);
            
            if (cartItem) {
                cartItem.quantity++
            } else {
                state.cartItems.push({ ...data.payload, quantity: 1 })
            }
        },

        removeFromCart: (state, data) => {
            const filteredCart = state.cartItems.filter(item => item.id != data.payload)
            state.cartItems = filteredCart
        },

        incrementQuantity: (state, data) => {
            const cartItem = state.cartItems.find(item => item.id === data.payload)
            if (cartItem) {
                cartItem.quantity++
            }
        },

        decrementQuantity: (state, data) => {
            const cartItem = state.cartItems.find(item => item.id === data.payload)
            if (cartItem) {
                if (cartItem.quantity == 1) {
                    const filteredCart = state.cartItems.filter(item => item.id != data.payload)
                    state.cartItems = filteredCart
                } else {
                    cartItem.quantity--
                }
            }
        },

        setQuantity: (state, data) => {
            const cartItem = state.cartItems.find(item => item.id === data.payload.productItem.id)
            if (cartItem) {
                if (data.payload.count) {
                    cartItem.quantity = data.payload.count as number
                } else {
                    const filteredCart = state.cartItems.filter(item => item.id != data.payload.productItem.id)
                    state.cartItems = filteredCart
                }
            }
        },

        clearCart: (state) => {
            state.cartItems = []
        }
    }

})

export const cartActions = slice.actions
export const cartReducer = slice.reducer