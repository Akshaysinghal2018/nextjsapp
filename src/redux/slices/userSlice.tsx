import { createSlice } from '@reduxjs/toolkit'


interface UserState {
    user: string | null
}

const initialState: UserState = {
    user: localStorage.getItem('user')
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer