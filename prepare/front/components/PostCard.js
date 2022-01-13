import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons/lib/icons"
import { Avatar, Button, Card, Comment, List, Popover } from "antd"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types'
import PostImages from "./PostImages"
import { useCallback, useState } from "react"
import CommentForm from "./CommentForm"
import PostCardContent from "./PostCardContent"
import { REMOVE_POST_REQUEST } from "../reducers/post"
import FollowButton from "./FollowButton"

const PostCard = ({ post }) => {
  const dispatch = useDispatch()
  const { removePostLoading } = useSelector(state => state.post)
  const id = useSelector(state => state.user.me?.id)
  // const { me } = useSelector(state => state.user)
  // const id = me?.id // me 가 있다면 me.id 를 꺼내겠다는 뜻^^ (옵셔널 체이닝)
  const [liked, setLiked] = useState(false)
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev)
  }, [])
  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
  }, [])

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, [])

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked 
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} /> 
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover key="more" content={(
            <Button.Group>
              {/* 로그인 되어있고 작성자 id 와 내 id 가 같다면 or 다르다면 */}
              {id && post.User.id === id ? (
                <> 
                  <Button>수정</Button>
                  <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                </>
              ) : (<Button>신고</Button>)}
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        {/* <Image src /> */}
        <Card.Meta 
          avatar={<Avatar>post.User.nickname[0]</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment 
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard