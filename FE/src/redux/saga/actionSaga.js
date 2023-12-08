// import libraries
import { takeEvery, put, all, call } from "redux-saga/effects";
import axios from "axios";

function* addActions(action) {
  try {
    const res1 = yield call(
      axios.put,
      `http://localhost:5000/operation`,
      action.payload
    );
    // yield put({ type: "actions/setActions", payload: { grid: 1 } });
  } catch (error) {
    error.response.data.error && alert(error.response.data.error);
  }
}
function* Localization(action) {
  try {
    const res1 = yield call(

      axios.put,
      `http://localhost:5000/localizations`,
      action.payload
    );
    // yield put({ type: "actions/setActions", payload: { grid: 1 } });
  } catch (error) {
    error.response.data.error && alert(error.response.data.error);
  }
}
function* Location(action) {
  try {
    const res1 = yield call(

      axios.post,
      `http://localhost:5000/localizations/location`,
      action.payload
    );
    // yield put({ type: "actions/setActions", payload: { grid: 1 } });
  } catch (error) {
    error.response.data.error && alert(error.response.data.error);
  }
}
function* delLocation(action) {
  try {
    const res1 = yield call(

      axios.delete,
      `http://localhost:5000/localizations/location`
    
    );
    // yield put({ type: "actions/setActions", payload: { grid: 1 } });
  } catch (error) {
    error.response.data.error && alert(error.response.data.error);
  }
}

function* actionSaga() {
  yield all([takeEvery("actionSaga/addAction", addActions)]);
  yield all([takeEvery("actionSaga/localization", Localization)]);
  yield all([takeEvery("actionSaga/location", Location)]);
  yield all([takeEvery("actionSaga/delLocation", delLocation)]);
 
 
}

export default actionSaga;
