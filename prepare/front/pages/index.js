import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from 'redux-saga'
import wrapper from "../store/configureStore";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector(state => state.post)

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length -1]?.id
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts])
  
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

// 프론트서버에서 실행되어 SSR 이 실행됨
export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
  // 서버쪽으로 쿠키 전달을 위한 코드
  const cookie = context.req ? context.req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (context.req && cookie) { // 서버에 접속중이며 cookie 가 있을 때만 cookie 를 보냄
    axios.defaults.headers.Cookie = cookie
  }
  // getServerSideProps 의 인자 context 는 store 를 가지고 있어 dispatch 가능
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default Home;
