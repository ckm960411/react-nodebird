import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons/lib/icons"
import { Avatar, Button, Card, Comment, List, Popover } from "antd"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types'
import PostImages from "./PostImages"
import { useCallback, useEffect, useState } from "react"
import CommentForm from "./CommentForm"
import PostCardContent from "./PostCardContent"
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from "../reducers/post"
import FollowButton from "./FollowButton"

const PostCard = ({ post }) => {
  const dispatch = useDispatch()
  const { removePostLoading } = useSelector(state => state.post)
  const id = useSelector(state => state.user.me?.id)
  const liked = post.Likers.find(v => v.id === id)
  const [commentFormOpened, setCommentFormOpened] = useState(false)

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id])
  
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id])

  const onToggleComment = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.')
    }
    setCommentFormOpened(prev => !prev)
  }, [id])

  const onRemovePost = useCallback(() => {
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, [id])

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    })
  }, [id])

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked 
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} /> 
            : <HeartOutlined key="heart" onClick={onLike} />,
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
        title={post.RetweetIdId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetIdId && post.RetweetId
          ? (
              <Card
                cover={post.RetweetId.Images[0] && <PostImages images={post.RetweetId.Images} />}
              >
                <Card.Meta 
                  avatar={<Avatar>{post.RetweetId.User.nickname[0]}</Avatar>}
                  title={post.RetweetId.User.nickname}
                  description={<PostCardContent postData={post.RetweetId.content} />}
                />
              </Card>
            )
          : (
              <Card.Meta 
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
              />
            )
        }
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
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetIdId: PropTypes.number, // RetweetId
    RetweetId: PropTypes.objectOf(PropTypes.any), // Retweet
  }).isRequired,
}

export default PostCard