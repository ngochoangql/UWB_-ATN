// import sagas

import actionSaga from "./saga/actionSaga";
import deviceSaga from "./saga/deviceSaga";
import userSaga from "./saga/userSaga";

// import libraries
import { all } from "redux-saga/effects"


function* rootSaga() {
    yield all([
        userSaga(),
        deviceSaga(),
        actionSaga()
    ])
}

export default rootSaga
