import { useState, useEffect } from 'react'
import CatFact from './components/CatFact'
import CatImage from './components/CatImage'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import Button from './components/Button'
import './App.css'

function App() {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getFirstWords = (fact) => {
    return fact.split(' ').slice(0, 4).join(' ')
  }

  const loadNewFact = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get cat fact
      const res = await fetch('https://catfact.ninja/fact')
      const data = await res.json()
      const newFact = data.fact
      setFact(newFact)

      // Get first words for the image
      const firstWords = getFirstWords(newFact)

      // Directly construct the image URL without fetching JSON first
      // This is more reliable as the API might not always return JSON properly
      const imageUrl = `https://cataas.com/cat/says/${encodeURIComponent(firstWords)}?size=50&color=red`
      setImageUrl(imageUrl)
    } catch (err) {
      console.error('Error:', err)
      setError('Error loading cat fact and image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNewFact()
  }, [])

  return (
    <div className="container">
      <h1>Random Cat Facts</h1>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="content">
          <CatFact fact={fact} />
          <CatImage imageUrl={imageUrl} />
          <Button onClick={loadNewFact} />
        </div>
      )}
    </div>
  )
}

export default App
