import PropTypes from 'prop-types'
import { StopOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, List } from "antd";
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch()

  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      })
    }
    else if (header === '팔로워') {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id
      })
    }
  }

  return (
    <List 
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4  }}
      size="small"
      header={<div>{header}</div>}
      loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button>더보기</Button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]} onClick={onCancel(item.id)}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList;
