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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};
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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
