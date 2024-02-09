import { HowTo, HowToIcon } from './howTo'
import { Stats, StatsBox, StatsBoxIcon } from './statsBox'
import { Popup } from './popup'
import { Timer } from "./timer"
import { useState } from "react"

type Props = {
    stats: Stats
    serverTime: React.MutableRefObject<number>
}

export const Menu = ({ stats, serverTime }: Props) => {

    const [showHowTo, setShowHowTo] = useState(false) // display HowTo modal
    const [showStats, setShowStats] = useState(false) // display Stats modal

    return (

        <div className='nav'>
            <div className='fixed-width'>
                <Timer serverTime={serverTime} />
            </div>
            <div className="title op-font">Animedle</div>
            <div className='fixed-width'>
                <HowToIcon setShow={setShowHowTo} />
                <span> </span>
                <StatsBoxIcon setShow={setShowStats} />
            </div>
            <Popup show={showStats} setShow={setShowStats} ><StatsBox stats={stats} /></Popup>
            <Popup show={showHowTo} setShow={setShowHowTo}><HowTo /></Popup>
        </div>
    )
}