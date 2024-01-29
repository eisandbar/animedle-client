import { useEffect, useState } from "react"

export const Timer = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1 * 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const time = date.toLocaleTimeString()
    return (
        <p>{time}</p>
    )
}