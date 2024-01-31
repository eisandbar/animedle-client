import { useEffect, useRef, useState } from "react"

const Day = 1000 * 60 * 60 * 24

export const Timer = () => {
    const serverTime = useRef(0) 
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        getTime()
        const timer = setInterval(() => {
            setDate(new Date(serverTime.current + Day - Date.now()))
        }, 1 * 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const getTime = async (): Promise<void> => {
        const response = await fetch(`http://localhost:8080/time`)
        const result: string = await response.text()
        serverTime.current = Number(result)
    }

    const time = date.toISOString().substring(11,19)
    return (
        <p>Next: {time}</p>
    )
}