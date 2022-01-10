import { Button, Form, Input } from "antd"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useInput from "../hooks/useInput"
import { addPost } from "../reducers/post"

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const [text, onChangeText, setText] = useInput('')
  
  useEffect(() => {
    if (addPostDone) {
      setText('')
    } // 포스팅이 완료되었을 때에서야 text 를 지워줌
  }, [addPostDone])
  
  const onSubmit = useCallback(() => {
    dispatch(addPost(text))
  }, [text])
  
  const imageInputRef = useRef()
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  return (
    <Form style={{ amrgin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInputRef} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map(v => {
          <div key={v} style={{ display: 'inline-block' }}>
            <Image src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        })}
      </div>
    </Form>
  )
}

export default PostForm