import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    singUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  }
}

// Action Creator (액션을 계속 여러개를 만드는 건 비효율적이므로 액션 생성 함수를 씀)
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
}
export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE :
      return { ...state, ...action.payload}
    case 'LOG_IN' :
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        }
      }
    case 'LOG_OUT' :
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        }
      }
    default :
      return state
  }
}

export default rootReducer