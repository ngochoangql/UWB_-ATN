// import libraries
import { createSlice } from '@reduxjs/toolkit'

const actionSlice = createSlice({
    name: "actions",
    initialState: {
        grid: 0,
    },
    reducers: {
        setActions(state, action) {
            return action.payload
        }
    }
})

export default actionSlice