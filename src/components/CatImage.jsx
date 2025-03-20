import './CatImage.css'
import { useState } from 'react'

function CatImage({ imageUrl }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="cat-image-container">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt="Cat with fact text"
          className="cat-image"
          onError={() => {
            console.error('Image failed to load');
            setImageError(true);
          }}
        />
      ) : (
        <img
          src="https://placekitten.com/500/300"
          alt="Fallback cat image"
          className="cat-image"
        />
      )}
    </div>
  )
}

export default CatImage