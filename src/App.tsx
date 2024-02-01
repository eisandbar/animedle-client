import { useEffect, useRef, useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResultBox, Response } from './components/resultBox'
import { HealthBar } from './components/healthBar'
import { Menu } from './components/menu'
import { InputBar } from './components/inputBar';
import { EndScreen } from './components/endScreen';
import { Stats } from './components/statsBox';

function App() {
  const serverTime = useRef(0) // The last time the game updated
  const [health, setHealth] = useState(10) // we can always get health from results, but this is more convenient
  const [results, setResults] = useState<Response[]>([]) // The results of all our guesses for the current game
  const [stats, setStats] = useState<Stats>({ games: 0, guesses: 0, streak: 0 }) // Player stats
  const [win, setWin] = useState(0) // endScreen display, -1 for a loss, +1 for a win

  // Loads data from localStorage
  useEffect(() => {
    const localResults = localStorage.getItem("results")
    if (localResults) {
      setResults(JSON.parse(localResults))
    }

    const localStats = localStorage.getItem("stats")
    if (localStats) {
      setStats(JSON.parse(localStats))
    }

    getTime()
  }, [])

  // Updates health and saves results to localStorage
  useEffect(() => {
    setHealth(10 - results.length)
    if (results.length > 0) localStorage.setItem("results", JSON.stringify(results))
  }, [results])

  // Lose condition
  useEffect(() => {
    if (health == 0) {
      setWin(-1)
    }
  }, [health])

  // Updates stats at the end of a game
  const updateStats = () => {
    let newStreak = stats.streak
    if (win > 0) {
      newStreak++
    } else {
      newStreak = 0
    }
    setStats({
      games: stats.games + 1,
      guesses: stats.guesses + 10 - health,
      streak: newStreak
    })
    localStorage.setItem("stats", JSON.stringify(stats))
  }

  // Updates serverTime
  const getTime = async (): Promise<void> => {
    const response = await fetch(`http://localhost:8080/time`)
    const result: string = await response.text()
    serverTime.current = Number(result)

    // If game updated clear old data
    const time = localStorage.getItem("time")
    if (!time || serverTime.current > Number.parseInt(time)) {
      localStorage.setItem("time", serverTime.current.toString())
      setWin(0)
      setResults([])
      localStorage.removeItem("results")
    }
  }


  return (
    <div className='app'>
      <Menu stats={stats} serverTime={serverTime} />
      <InputBar results={results} setResults={setResults} health={health} setWin={setWin} />
      <HealthBar health={health} />
      <ResultBox results={results} />
      <EndScreen win={win} health={health} updateStats={updateStats} ></EndScreen>
    </div>
  )
}

export default App