import PostCard from "./PostCard"
import PropTypes from 'prop-types'
import Link from "next/link"

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {/* 게시글 안에서 #해시태그 를 찾아내서 링크를 걸어주고 해당 링크 컴포넌트로 이동하게 */}
      {postData
        .toString()
        .split(/(#[^\s#]+)/g)
        .map((v, i) => {
          if (v.match(/(#[^\s#]+)/g)) {
            return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
          }
        return v
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}

export default PostCardContent