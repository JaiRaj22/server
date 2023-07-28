import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isauth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticateUser: (state) => {
            state.isauth = true
        },
        UnauthenticateUser: (state) => {
            state.isauth = false
        }
    },
})

export const { authenticateUser,UnauthenticateUser } = authSlice.actions
export default authSlice.reducer