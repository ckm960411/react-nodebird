import axios from "axios"
import { all, delay, fork, put, takeLatest } from "redux-saga/effects"

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

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ])
}