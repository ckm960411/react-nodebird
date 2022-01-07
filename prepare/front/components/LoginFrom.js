import React, { useState, useCallback } from 'react'
import { Input } from "antd"
import Form from "antd/lib/form/Form"
import Link from 'next/link'

const LoginForm = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onChangeId = useCallback((e) => {
    setId(e.target.value)
  }, [])
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [])

  return (
    <div>
      <Form>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" value={password} onChange={onChangePassword} required />
        </div>
        <div>
          <button type="primary" htmlType="submit" loading={false}>로그인</button>
          <Link href="/singup"><a>회원가입</a></Link>
        </div>
        <div>

        </div>
      </Form>
    </div>
  )
}

export default LoginForm