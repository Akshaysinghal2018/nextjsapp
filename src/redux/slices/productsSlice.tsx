import { createSlice } from '@reduxjs/toolkit'
import { TProductType } from "@/types/type"
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const data = await fetch("https://fakestoreapi.com/products").then((response) => response.json())
        return data
    },
)

interface StoreState {
    products: TProductType[];
}

const initialState: StoreState = {
    products: [],
};


export const productsSlice = createSlice({
    name: 'products',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
            state.products = action.payload
        })
    }
})

export default productsSlice.reducer