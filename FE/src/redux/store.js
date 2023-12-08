// import libraries
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import reducers
import userSlice from './reducer/userReducer'

// import rootSaga
import rootSaga from './rootSaga'
import devicesSlice from './reducer/devicesReducer'
import actionSlice from './reducer/actionReducer'
import oldDevicesSlice from './reducer/oldDeviceReducer'




const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        devices: devicesSlice.reducer,
        actions: actionSlice.reducer,
        oldDevices: oldDevicesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

export default store