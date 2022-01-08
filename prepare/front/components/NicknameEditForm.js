import { Form,  Input } from 'antd'
import { useMemo } from 'react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin-bottom: 20px !important;
  border: 1px solid #d9d9d9 !important;
  padding: 20px !important;
`

const NicknameEditForm = () => {
  const style = useMemo(() => ({ marginBottm: '20px', border: '1px solid #d9d9d9', padding: '20px', }), [])

  return (
    <StyledForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </StyledForm>
  )
}

export default NicknameEditForm;
