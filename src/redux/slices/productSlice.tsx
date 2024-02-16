import { createSlice } from '@reduxjs/toolkit'
import { TProductType } from "@/types/type"


interface StoreState {
    product: TProductType;
}

const initialState: StoreState = {
    product: {
        category: "",
        description: "",
        id: "",
        image: "",
        price: 0,
        rating: {
            count: 0,
            rate: 0,
        },
        title: "",
    },
};


export const productSlice = createSlice({
    name: 'product',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.product = action.payload
        }
    }
})

export const { selectProduct } = productSlice.actions

export default productSlice.reducer