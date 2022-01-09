import { PlusOutlined } from '@ant-design/icons/lib/icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)

  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} style={{ width: '50%', display: 'inline-block' }} />
        <img role="presentation" src={images[1].src} alt={images[1].src} onClick={onZoom} style={{ width: '50%', display: 'inline-block' }} />
      </>
    )
  }
  return (
    <>
      <div>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} width="50%" />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더 보기
        </div>
      </div>
    </>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages