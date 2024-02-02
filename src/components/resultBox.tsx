import { Box } from "./box"

import '../css/resultBox.css'
import { ResultRow } from "./resultRow"

type BarProps = {
    results: Response[]
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

export const ResultBox = ({ results }: BarProps) => {
    return (
        <div className="flex container">
            <div className="result-box">
                <CategoryRow />
                {results.map((res) => {
                    return <ResultRow response={res} key={res.title.text} />
                })}
            </div>
        </div>
    )
}

const CategoryRow = () => {
    return (
        <div className="flex">
            <p className="category-title">Title</p>
            <p className="category-title">Start date</p>
            <p className="category-title">Average score</p>
            <p className="category-title">Genres</p>
            <p className="category-title">Media type</p>
            <p className="category-title"># of Episodes</p>
            <p className="category-title">Source</p>
            <p className="category-title">Episode duration</p>
            <p className="category-title">Studios</p>
        </div>
    )
}