import { Button, Form, Input } from "antd"
import { useCallback, useEffect, useState } from "react"
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { ADD_COMMENT_REQUEST } from '../reducers/post'

const StyledButton = styled(Button)`
  position: absolute;
  right: 0; bottom: -40px;
`

const CommentForm = ({post}) => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.user.me?.id)
  const { addCommentDone } = useSelector(state => state.post)
  const [commentText, onChangeCommentText, setCommentText] = useInput('')

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('')
    }
  }, [addCommentDone])

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id,}
    })
  }, [commentText, id])

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <StyledButton type="primary" htmlType="submit" >삐약</StyledButton>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm