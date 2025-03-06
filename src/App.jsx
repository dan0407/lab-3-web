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
      
      const res = await fetch('https://catfact.ninja/fact')
      const data = await res.json()
      const newFact = data.fact
      setFact(newFact)

      const firstWords = getFirstWords(newFact)
      const imageResponse = await fetch(`https://cataas.com/cat/says/${firstWords}?size=50&color=red&json=true`)
      const imageData = await imageResponse.json()
      setImageUrl(`https://cataas.com${imageData.url}`)
    } catch (err) {
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
