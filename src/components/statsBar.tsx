import { useEffect, useState } from "react"

export const StatsBar = () => {
    const [stats, setStats] = useState<Stats|undefined>(undefined)

    const getStats = async() => {
        const response = await fetch(encodeURI(`http://localhost:8080/stats`))
        const result: Stats = await response.json()
        setStats(result)
    }

    useEffect(() => {
        getStats()
    }, [])

    if (stats == undefined) return <div></div>
    return (
        <div className="stats-bar">
            <span>Todays Stats</span>
            <p><span>Games Finished: {stats.players}</span> <span>Wins: {stats.wins}</span> <span>Average Guesses: {stats.guesses == 0 ? 0 : (stats.guesses / stats.players).toFixed(1)}</span></p>
        </div>
    )
}

type Stats = {
    players: number
    wins: number
    guesses:number
}