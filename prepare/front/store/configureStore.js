import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from '../reducers/index'


const configureStore = () => {
  const middlewares = [] // saga 나 thunk 가 들어오게 될 자리
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares)) // 제품용
    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발용, 히스토리를 남김
  const store = createStore(reducer, enhancer)
  return store
}

const wrapper = createWrapper(configureStore, {debug: process.env.NODE_ENV === 'development'})

export default wrapper