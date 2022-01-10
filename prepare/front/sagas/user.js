import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function logInAPI(data) {
  return axios.post('/api/login', data)
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data)
    yield delay(1000)
    yield put({
      type: 'LOG_IN_SUCCESS',
      // data: result.data,
      data: action.data // 현재 서버로 요청을 날리지 않으므로 action.data 를 일단 바로 받음
    })
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/api/logout')
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI)
    yield delay(1000)
    yield put({
      type: 'LOG_OUT_SUCCESS',
    })
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    })
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn)
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut)
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
  ])
}