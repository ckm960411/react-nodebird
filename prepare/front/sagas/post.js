import axios from "axios"
import { all, delay, fork, put, takeLatest } from "redux-saga/effects"
import { 
  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, 
  ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS 
} from "../reducers/post"

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data)
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data)
    yield delay(1000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
      data: action.data,
    })
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
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
      type: ADD_POST_SUCCESS,
      // data: result.data,
      data: action.data,
    })
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment)
  ])
}