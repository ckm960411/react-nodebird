import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { 
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
  LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, 
  UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS 
} from "../reducers/user";

function followAPI(data) {
  return axios.post('/api/follow')
}
function* follow(action) {
  try {
    // const result = yield call(followAPI)
    yield delay(1000)
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    })
  } catch(error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}
function unfollowAPI(data) {
  return axios.post('/api/unfollow')
}
function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI)
    yield delay(1000)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    })
  } catch(error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function logInAPI(data) {
  return axios.post('/api/login', data)
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data)
    yield delay(1000)
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: action.data // 현재 서버로 요청을 날리지 않으므로 action.data 를 일단 바로 받음
    })
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
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
      type: LOG_OUT_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post('https://localhost:3065/user', data)
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    console.log(result)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch(error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp)
  ])
}