// import libraries
import { createSlice } from '@reduxjs/toolkit'

const devicesSlice = createSlice({
    name: "devices",
    initialState: null,
    reducers: {
        setDevices(state, action) {
            return action.payload
        },
        
        // removeProduct(state,action){
        //     return state.filter(item => item._id !== action.payload)
        // },
        // addProduct(state,action){
        //     return [...state,action.payload]
        // }
    }
})

export default devicesSlice