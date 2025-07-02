import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CulturalExhibitions from './CulturalExhibitions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <RoyalWeddingSection/> */}
    <CulturalExhibitions />
    </>
  )
}

export default App
