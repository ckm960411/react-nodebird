import React, { useState, useCallback } from "react";
import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px !important;
`

const LoginForm = () => {
  const dispatch = useDispatch()
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }))
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </ButtonWrapper>
      <div></div>
    </FormWrapper>
  );
};

export default LoginForm;