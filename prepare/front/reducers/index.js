import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

const rootReducer = (state, action) => {
  // SSR 을 위해서 HYDRATE case 의 index 가 추가됨
  switch(action.type) {
    case HYDRATE:
      console.log('HYDRATE', action)
      return action.payload
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      })
      return combinedReducer(state, action)
    }
  }
}

export default rootReducer;
