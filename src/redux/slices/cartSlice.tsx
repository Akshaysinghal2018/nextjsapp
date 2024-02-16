import { createSlice } from '@reduxjs/toolkit'
import { ICartItemType } from "@/types/type"

// Define a type for the slice state
interface CartStateType {
    cartItems: ICartItemType[]
    isLoading: boolean,
}

const initialState: CartStateType = {
    cartItems: [],
    isLoading: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exist = state.cartItems.find((x) => x.id === action.payload.id)

            if (!exist) {
                // const updateItem = { ...action.payload, qty: 1 }
                state.cartItems = [...state.cartItems, action.payload]
            } else {
                const updatedCart = state.cartItems.map((x) => x.id === action.payload.id ? action.payload : x)
                state.cartItems = updatedCart
            }
        },
        increase: (state, action) => {
            const exist = state.cartItems.find((x) => x.id === action.payload.id)
            if (exist) {
                const updatedCart = state.cartItems.map((x) => x.id === action.payload.id ? { ...exist, qty: exist?.qty + 1 } : x)
                state.cartItems = updatedCart
            }
        },
        decrease: (state, action) => {
            const exist = state.cartItems.find((x) => x.id === action.payload.id)

            if (exist) {
                const updatedCart = state.cartItems.map((x) => x.id === action.payload.id ? { ...exist, qty: exist?.qty - 1 } : x)
                state.cartItems = updatedCart
            }
        },
        deleteProduct: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },
        resetCart: (state) => {
            state.cartItems = [];
        },
    },
})

export const { addToCart, deleteProduct, resetCart, increase, decrease } = cartSlice.actions

export default cartSlice.reducer