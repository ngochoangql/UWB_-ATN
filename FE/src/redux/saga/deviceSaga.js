// import libraries
import { takeEvery, put, all, call } from "redux-saga/effects"
import axios from 'axios'
import { hexToDecimalLittleEndian } from "../../untils/untils";

function* getAllDevice(action) {
    try {
        const res1 = yield call(axios.get, `http://localhost:5000/devices`)
        const data = res1.data.map(item => {
            let binaryResult = "";
            for (let i = 0; i < item.operation.length; i += 2) {
                // Lấy cặp kí tự hex
                let hexPair = item.operation.substr(i, 2);
            
                // Chuyển đổi cặp kí tự hex thành số nguyên
                let decimalValue = parseInt(hexPair, 16);
            
                // Chuyển đổi số nguyên thành chuỗi nhị phân và thêm vào kết quả
                binaryResult += decimalValue.toString(2).padStart(8, '0');
              }
            return {...item,operation: binaryResult,x:hexToDecimalLittleEndian(item.location.substr(2,8)),y:hexToDecimalLittleEndian(item.location.substr(10,8)),z:hexToDecimalLittleEndian(item.location.substr(18,8))}
        })
        // console.log(action.payload)
        // yield put({ type: "oldDevices/setOldDevices", payload: action.payload})
        yield put({ type: "devices/setDevices", payload: data })
    }
    catch (error) {
        error.response.data.error && alert(error.response.data.error)
    }
}

function* deviceSaga() {
    yield all([
        takeEvery("deviceSaga/getDevices", getAllDevice),
       
    ])
}

export default deviceSaga