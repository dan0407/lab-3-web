function CatImage({ imageUrl }) {
  return (
    <img 
      src={imageUrl} 
      alt="Cat with fact text"
      className="cat-image"
    />
  )
}

export default CatImage
