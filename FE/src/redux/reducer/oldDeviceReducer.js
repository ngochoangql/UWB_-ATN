// import libraries
import { createSlice } from '@reduxjs/toolkit'

const oldDevicesSlice = createSlice({
    name: "oldDevices",
    initialState: null,
    reducers: {
        setOldDevices(state, action) {
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

export default oldDevicesSlice