import { Box } from "./box"

import '../css/resultBar.css'
import { ResultRow } from "./resultRow"

type BarProps = {
    results : Response[]
}


export type Response = {
    title: Box
    start_date: Box
    mean: Box
    genres: Box
    media_type: Box
    num_episodes: Box
    source: Box
    average_episode_duration: Box
    studios: Box
}

export const ResultBar = ({ results }: BarProps) => {
    return (
        <div>
            {results.map((res, id) => {
                return <ResultRow response={res} key={id}/>
            })}
        </div>
    )
}
