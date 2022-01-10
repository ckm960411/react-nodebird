import shortid from "shortid";
import { ADD_POST_TO_ME } from "./user";

export const initialState = {
  mainPosts: [
    {
      id: '1',
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: `첫 번째 게시글 #해시태그 #익스프레스`,
      Images: [
        {
          id: shortid.generate(),
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA5MTVfMTA4%2FMDAxNjAwMDk4MDUxNDg2.GXiwoSsmUUrbzXf8PioukfmzAq8Ess1iLzbPxHPlqjgg.emvP-77slx4sItEbq8UcGWWRow1J1flpxBFhDJfcDpQg.JPEG.jooheepaik71%2F1600098051217.jpg&type=sc960_832",
        },
        {
          id: shortid.generate(),
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MjZfNzYg%2FMDAxNTkzMTI4Njk2MDIx.ZUguuZYwUbYs_ItjW9HjO_YzneNb8khrEeCRiUw4uLcg.6ZO92XXjZinaDOP4g6gemdLmPOZJXb2qL21B1aQ35rYg.JPEG.zpdl92%2F10.jpg&type=sc960_832",
        },
        // {
        //   src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMTVfMjc5%2FMDAxNjM5NTc3MDg1OTcx.T6W76YSraXqd7hoPnbdxZiKiFYdurno5kLLJBxlg5a0g.jQ2wWPSG7BRDXbGLLxGK65VFtvlJV-87IoQpKz9t26Ig.JPEG.jasklove22%2FScreenshot%25A3%25DF20211215%25A3%25AD230402%25A3%25DF24_.jpg&type=sc960_832",
        // },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "hero",
          },
          content: "얼른 사고싶어요!",
        },
      ],
    },
  ],
  imagePaths: [],
  // 게시글 작성 관련
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  // 댓글 작성 관련
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});
const dummyComments = data => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "제로초",
  },
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 게시글 작성 관련
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      }
    // 댓글 작성 관련
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS:
      // 액션객체로 넘겨 받은 데이터는
      // { content: commentText, postId: post.id, userId: id,}
      const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
      const post = { ...state.mainPosts[postIndex] }
      post.Comments = [dummyComments(action.data.content), ...post.Comments]
      const mainPosts = [...state.mainPosts]
      mainPosts[postIndex] = post
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    default:
      return state;
  }
};

export default reducer;
