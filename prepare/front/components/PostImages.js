import { PlusOutlined } from '@ant-design/icons/lib/icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import ImagesZoom from './imagesZoom'


const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)

  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])
  const onClose = useCallback(() => {
    setShowImagesZoom(false)
  }, [])

  if (images.length === 1) {
    return (
      <>
        <img 
          role="presentation" 
          src={`http://localhost:3065/${images[0].src}`} 
          alt={images[0].src} 
          onClick={onZoom} 
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <img
            role="presentation" 
            src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} 
            onClick={onZoom} 
            width="100%" height="100%" layout='responsive' 
          />
        </div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <img
            role="presentation" 
            src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} 
            onClick={onZoom} 
            width="100%" height="100%" layout='responsive' 
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <img
            role="presentation" 
            src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} 
            onClick={onZoom} 
            width="100%" height="100%a" layout='responsive' 
          />
        </div>
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} ?????? ?????? ??? ??????
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages