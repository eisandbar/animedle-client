import { useEffect, useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResultBox, Response } from './components/resultBox'
import { HealthBar } from './components/healthBar'
import { Menu } from './components/menu'
import { InputBar } from './components/inputBar';
import { EndScreen } from './components/endScreen';

function App() {
  const [health, setHealth] = useState(10)
  const [results, setResults] =useState<Response[]>([])
  const [win, setWin] = useState(0) // endScreen display, -1 for a loss, +1 for a win

  useEffect(() => {
    const localResults = localStorage.getItem("results")
    if (localResults != null) {
      setResults( JSON.parse(localResults))
    }
  }, [])

  useEffect(() => {
    setHealth(10 - results.length)
    if (results.length > 0) localStorage.setItem("results", JSON.stringify(results))
  }, [results])

  useEffect(() => {
    if (health == 0) {
      setWin(-1)
    }
  }, [health])

  return (
    <div className='app'>
      <Menu/>
      <InputBar results={results} setResults={setResults} health={health} setWin={setWin}/>
      <HealthBar health={health}/>
      <ResultBox results={results} />
      <EndScreen win={win} health={health}></EndScreen>
    </div>
  )
}

export default App