export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: `첫 번째 게시글 #해시태그 #익스프레스`,
      Images: [
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA5MTVfMTA4%2FMDAxNjAwMDk4MDUxNDg2.GXiwoSsmUUrbzXf8PioukfmzAq8Ess1iLzbPxHPlqjgg.emvP-77slx4sItEbq8UcGWWRow1J1flpxBFhDJfcDpQg.JPEG.jooheepaik71%2F1600098051217.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MjZfNzYg%2FMDAxNTkzMTI4Njk2MDIx.ZUguuZYwUbYs_ItjW9HjO_YzneNb8khrEeCRiUw4uLcg.6ZO92XXjZinaDOP4g6gemdLmPOZJXb2qL21B1aQ35rYg.JPEG.zpdl92%2F10.jpg&type=sc960_832",
        },
        // {
        //   src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMTVfMjc5%2FMDAxNjM5NTc3MDg1OTcx.T6W76YSraXqd7hoPnbdxZiKiFYdurno5kLLJBxlg5a0g.jQ2wWPSG7BRDXbGLLxGK65VFtvlJV-87IoQpKz9t26Ig.JPEG.jasklove22%2FScreenshot%25A3%25DF20211215%25A3%25AD230402%25A3%25DF24_.jpg&type=sc960_832",
        // },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요!",
        },
      ],
    },
    {
      id: 2,
      User: {
        id: 2,
        nickname: "경민복",
      },
      content: `경민복의 두 번째 게시글 #해시태그 #익스프레스`,
      Images: [
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA5MTVfMTA4%2FMDAxNjAwMDk4MDUxNDg2.GXiwoSsmUUrbzXf8PioukfmzAq8Ess1iLzbPxHPlqjgg.emvP-77slx4sItEbq8UcGWWRow1J1flpxBFhDJfcDpQg.JPEG.jooheepaik71%2F1600098051217.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MjZfNzYg%2FMDAxNTkzMTI4Njk2MDIx.ZUguuZYwUbYs_ItjW9HjO_YzneNb8khrEeCRiUw4uLcg.6ZO92XXjZinaDOP4g6gemdLmPOZJXb2qL21B1aQ35rYg.JPEG.zpdl92%2F10.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMTVfMjc5%2FMDAxNjM5NTc3MDg1OTcx.T6W76YSraXqd7hoPnbdxZiKiFYdurno5kLLJBxlg5a0g.jQ2wWPSG7BRDXbGLLxGK65VFtvlJV-87IoQpKz9t26Ig.JPEG.jasklove22%2FScreenshot%25A3%25DF20211215%25A3%25AD230402%25A3%25DF24_.jpg&type=sc960_832",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
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
const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
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
