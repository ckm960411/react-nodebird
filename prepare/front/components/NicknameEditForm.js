import { Form,  Input } from 'antd'
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput'
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const StyledForm = styled(Form)`
  margin-bottom: 20px !important;
  border: 1px solid #d9d9d9 !important;
  padding: 20px !important;
`

const NicknameEditForm = () => {
  const { me } = useSelector(state => state.user)
  const [nickname, onChangeNickname] = useInput(me?.nickname || '')
  const dispatch = useDispatch()

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname
    })
  }, [nickname])

  return (
    <StyledForm>
      <Input.Search 
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임" 
        enterButton="수정" 
        onSearch={onSubmit}
      />
    </StyledForm>
  )
}

export default NicknameEditForm;
