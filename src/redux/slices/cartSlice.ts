import { createSlice } from "@reduxjs/toolkit";

const initialState: { cartSize: number } = { cartSize: 0 }

const slice = createSlice({
    initialState: initialState,
    name: 'cartState',
    // reducers - объект с действиями (actions) для данного slice-а 
    reducers: {
        // state - предыдущее состояние, data - данные
        addToCart: (state) => {
            state.cartSize += 1
        },
        removeFromCart: (state) => {
            state.cartSize -= 1
        },
        clearCart: (state) => {
            state.cartSize = 0;
        }
    }

})

export const cartActions = slice.actions
export const cartReducer = slice.reducer
