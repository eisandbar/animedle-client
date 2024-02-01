import { useEffect, useState } from "react"

const Day = 1000 * 60 * 60 * 24

type Props = {
    serverTime: React.MutableRefObject<number>
}

export const Timer = ({ serverTime }: Props) => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date(serverTime.current + Day - Date.now()))
        }, 1 * 1000)
        return () => {
            clearInterval(timer)
        }
    }, [serverTime])

    const time = date.toISOString().substring(11, 19)
    return (
        <p>Next: {time}</p>
    )
}