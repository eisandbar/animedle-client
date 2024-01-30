import { useEffect, useState } from "react"

type Props = {
    win: number
    health: number
}

export const EndScreen = ({ win, health }: Props) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (win != 0) {
            setShow(true)
        }
    }, [win])

    const onClick = () => {
        setShow(false)
    }

    return (
        <div className='popup'
            style={{ visibility: show ? 'visible' : 'hidden' }}>
            <div className='popup-content'>
                <button className="close" onClick={onClick}>&times;</button>
                <div className='popup-body'>
                    {win > 0 ? <p>Win</p> : <p>Lose</p>}
                    {"Guesses: " + (10 - health)}
                </div>
            </div>
        </div>
    )
}