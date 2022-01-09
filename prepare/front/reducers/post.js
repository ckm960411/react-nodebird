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
          src: "http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=#N,",
        },
        {
          src: "http://image.kyobobook.co.kr/images/book/large/796/l9791160508796.jpg",
        },
        {
          src: "http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791188073801&orderClick=LAG&Kc=#N",
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
    {
      id: 2,
      User: {
        id: 2,
        nickname: "경민복",
      },
      content: `경민복의 두 번째 게시글 #해시태그 #익스프레스`,
      Images: [
        {
          src: "http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=#N,",
        },
        {
          src: "http://image.kyobobook.co.kr/images/book/large/796/l9791160508796.jpg",
        },
        {
          src: "http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791188073801&orderClick=LAG&Kc=#N",
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
