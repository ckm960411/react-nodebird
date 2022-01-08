import { Button, Form, Input } from "antd"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../reducers/post"

const PostForm = () => {
  const { imagePaths } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const imageInputRef = useRef()
  const [text, setText] = useState('')

  const onChangeText = useCallback(e => setText(e.target.value), [])
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current.click()
  }, [])
  const onSubmit = useCallback(() => {
    dispatch(addPost) // 현재 post.js 리듀서에서 addPost 를 함수가 아닌 액션 객체로 만들어놓았음
    setText('')
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