import { useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Popup } from './components/popup'
import { HowTo, HowToIcon } from './components/howTo'
import { StatsBox, StatsBoxIcon } from './components/statsBox'
import { ResultBar } from './components/resultBar'
import { HealthBar } from './components/healthBar'
import { Menu } from './components/menu'
import { InputBar } from './components/inputBar';
import { Timer } from './components/timer';

function App() {
  const [count, setCount] = useState(10)
  const [showHowTo, setShowHowTo] = useState(false)
  const [showStats, setShowStats] = useState(false)

  return (
    <>
      <Menu/>
      <Timer/> 
      <button onClick={() => setCount((count) => count - 1)}/>
      <InputBar/>
      <HealthBar health={count}/>
      <ResultBar categories={data} />
      <HowToIcon setShow={setShowHowTo} />
      <StatsBoxIcon setShow={setShowStats} />
      <Popup show={showStats} setShow={setShowStats} ><StatsBox /></Popup>
      <Popup show={showHowTo} setShow={setShowHowTo}><HowTo /></Popup>
    </>
  )
}

export default App


const data = [{ text: "Hi", type: "yellow" }, {text: "Hi", type: "down"}, {text: "Hi", type: "red"}, {text: "Hi", type: "green"}, {text: "Hi", type: "up"}]