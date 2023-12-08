// import libraries
import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects"
import axios from 'axios'

function* loginSaga(action) {
    try {
        const res1 = yield call(axios.post, `http://localhost:3001/signin`, action.payload)
        yield put({ type: "user/userLogin", payload: res1.data })
    }
    catch (error) {
        error.response.data.error && alert(error.response.data.error)
    }
}
function* logoutSaga() {
    yield put({ type: "user/userLogout", payload: null })
}

function* userSaga() {
    yield all([
        takeEvery("userSaga/userLogin", loginSaga),
        takeEvery("userSaga/userLogout", logoutSaga)
    ])
}

export default userSaga