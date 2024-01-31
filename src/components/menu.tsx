import { HowTo, HowToIcon } from './howTo'
import { StatsBox, StatsBoxIcon } from './statsBox'
import { Popup } from './popup'
import { Timer } from "./timer"
import { useState } from "react"

export const Menu = () => {

    const [showHowTo, setShowHowTo] = useState(false) // display HowTo modal
    const [showStats, setShowStats] = useState(false) // display Stats modal

    return (

        <div className='nav'>
            <div><Timer /></div>
            <div className="title"><h2>Animedle</h2></div>
            <div>
                <HowToIcon setShow={setShowHowTo} />
                <StatsBoxIcon setShow={setShowStats} />
            </div>
            <Popup show={showStats} setShow={setShowStats} ><StatsBox /></Popup>
            <Popup show={showHowTo} setShow={setShowHowTo}><HowTo /></Popup>
        </div>
    )
}