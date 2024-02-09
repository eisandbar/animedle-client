import { useEffect, useRef, useState } from 'react'
import './css/App.css'
import './css/bootstrap.css'
import { ResultBox, Response } from './components/resultBox'
import { HealthBar } from './components/healthBar'
import { Menu } from './components/menu'
import { InputBar } from './components/inputBar';
import { EndScreen } from './components/endScreen';
import { Stats } from './components/statsBox';
import { StatsBar } from './components/statsBar'
import { host } from './util/const'

export const Lives = 10
function App() {
  // Make sure to use ref.current instead of just ref
  const inProgress = useRef(false)
  const win = useRef(false)
  const serverTime = useRef(0) // The last time the game updated

  const [health, setHealth] = useState(Lives) // we can always get health from results, but this is more convenient
  const [results, setResults] = useState<Response[]>([]) // The results of all our guesses for the current game
  const [stats, setStats] = useState<Stats>({ games: 0, guesses: 0, streak: 0 }) // Player stats
  const [showEndScreen, setShowEndScreen] = useState(false)

  // Loads data from localStorage
  useEffect(() => {
    const localStats = localStorage.getItem("stats")
    if (localStats) {
      setStats(JSON.parse(localStats))
    }

    getTime()
  }, [])

  // Updates health and saves results to localStorage
  useEffect(() => {
    setHealth(Lives - results.length)
    if (results.length > 0) {
      localStorage.setItem("results", JSON.stringify(results))
    }
  }, [results])


  useEffect(() => {
    if (stats.games > 0) {
      localStorage.setItem("stats", JSON.stringify(stats))
    }
  }, [stats])


  // End of game effect
  useEffect(() => {
    // Updates stats at the end of a game
    const updateStats = () => {
      let newStreak = stats.streak
      if (win.current) {
        newStreak++
      } else {
        newStreak = 0
      }
      setStats({
        games: stats.games + 1,
        guesses: stats.guesses + results.length,
        streak: newStreak
      })
    }

    // Sends result of game to server
    const sendResult = () => {
      fetch(`${host}/win`, {
        method: "POST",
        body: JSON.stringify({
          win: win.current,
          guesses: results.length,
          server_time: serverTime.current
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

    }

    // When game is in progress and just finished
    if (inProgress.current && results.length > 0 && (results[0].title.type == "green" || results.length == 10)) {
      win.current = results[0].title.type == "green"
      inProgress.current = false
      setShowEndScreen(true)
      updateStats()
      sendResult()
    }
  }, [results, stats])

  // Updates serverTime
  const getTime = async (): Promise<void> => {
    const response = await fetch(`${host}/time`)
    const result: string = await response.text()
    serverTime.current = Number(result)

    // If game updated clear old data
    const time = localStorage.getItem("time")
    if (time == null || serverTime.current > Number.parseInt(time)) {
      localStorage.setItem("time", serverTime.current.toString())
      inProgress.current = true
      setResults([])
      localStorage.removeItem("results")
    }

    // If time matches and game isn't complete
    if (serverTime.current == Number.parseInt(time!)) {
      let localResults: Response[] = []
      const json = localStorage.getItem("results")
      if (json) {
        localResults = JSON.parse(json)
        setResults(localResults)
      }
      if (localResults.length == 0 || (localResults.length < 10 && localResults[0].title.type != "green")) {
        inProgress.current = true
      }
    }
  }


  return (
    <div className='app'>
      <Menu stats={stats} serverTime={serverTime} />
      <InputBar results={results} setResults={setResults} health={health} />
      <StatsBar/>
      <HealthBar health={health} />
      <ResultBox results={results} />
      <EndScreen win={win.current} health={health} show={showEndScreen} setShow={setShowEndScreen} ></EndScreen>
    </div>
  )
}

export default App