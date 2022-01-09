import axios from 'axios'
import { all, call, fork, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'

function logInAPI(data) {
  return axios.post('/api/login', data)
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data)
    yield delay(1000)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
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
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    })
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data)
}
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: error.response.data,
    })
  }
}

function* watchLogIn() {
  // 마우스가 더블클릭 되는 등의 이벤트가 발생하면
  // 요청을 여러번 수행하지 않고 마지막 요청을 받아들임
  yield takeLatest('LOG_IN_REQUEST', logIn)
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut)
}
function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost)
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost)
  ])
}
