import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons/lib/icons"
import { Avatar, Button, Card, Popover } from "antd"
import ButtonGroup from "antd/lib/button/button-group"
import { Content } from "antd/lib/layout/layout"
import Image from "next/image"
import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import PostImages from "./PostImages"
import { useCallback, useState } from "react"

const PostCard = ({ post }) => {
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
                  <Button type="danger">삭제</Button>
                </>
              ) : (<Button>신고</Button>)}
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {/* <Image src /> */}
        <Card.Meta 
          avatar={<Avatar>post.User.nickname[0]</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && (
        <div>
          댓글 부분
        </div>
      )}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard