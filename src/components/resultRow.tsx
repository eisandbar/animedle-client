import { Box } from "./box"
import { Response } from "./resultBar"

type RowProps = {
    response: Response
}

export const ResultRow = ({response} : RowProps) => {
    if (response == undefined) {
        return
    }
    return (
        <div className="result-bar">
            <Box box={response.title}/>
            <Box box={response.start_date}/>
            <Box box={response.mean}/>
            <Box box={response.genres}/>
            <Box box={response.media_type}/>
            <Box box={response.num_episodes}/>
            <Box box={response.source}/>
            <Box box={response.average_episode_duration}/>
            <Box box={response.studios}/>
        </div>
    )
}