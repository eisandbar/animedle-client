import { useEffect, useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Popup } from './components/popup'
import { HowTo, HowToIcon } from './components/howTo'
import { StatsBox, StatsBoxIcon } from './components/statsBox'
import { ResultBox, Response } from './components/resultBox'
import { HealthBar } from './components/healthBar'
import { Menu } from './components/menu'
import { InputBar } from './components/inputBar';
import { Timer } from './components/timer';
import { EndScreen } from './components/endScreen';

function App() {
  const [health, setHealth] = useState(10)
  const [results, setResults] =useState<Response[]>([])
  const [win, setWin] = useState(0) // endScreen display, -1 for a loss, +1 for a win

  const [showHowTo, setShowHowTo] = useState(false) // display HowTo modal
  const [showStats, setShowStats] = useState(false) // display Stats modal


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
    <>
      <Menu/>
      <Timer/> 
      <InputBar results={results} setResults={setResults} health={health} setWin={setWin}/>
      <HealthBar health={health}/>
      <ResultBox results={results} />
      <HowToIcon setShow={setShowHowTo} />
      <StatsBoxIcon setShow={setShowStats} />
      <Popup show={showStats} setShow={setShowStats} ><StatsBox /></Popup>
      <Popup show={showHowTo} setShow={setShowHowTo}><HowTo /></Popup>
      <EndScreen win={win} health={health}></EndScreen>
    </>
  )
}

export default App