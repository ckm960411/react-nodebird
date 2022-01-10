import shortid from "shortid";
import produce from "immer";

export const initialState = {
  mainPosts: [
    {
      id: "1",
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
  // 게시글 삭제 관련
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // 댓글 작성 관련
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});
const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "제로초",
  },
});

// 이전 상태를 action 을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 게시글 작성 관련
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      // 게시글 삭제 관련
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      // 댓글 작성 관련
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        // 액션객체로 넘겨 받은 데이터는
        // { content: commentText, postId: post.id, userId: id,}
        const post = draft.mainPosts.find((v) => v.id === action.data.postId); // 얘는 찾아줘야 함
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
