import { Box } from "./box"

import '../css/resultBar.css'

type Props = {
    categories: Response[]
}

type Response = {
    type: string
    text: string
}

export const ResultBar = ({ categories }: Props) => {
    return (
        <div className="result-bar">{
            categories.map((res: Response) => {
                return (
                    <Box type={res.type}>{res.text}</Box>
                )
            })
        }</div>
    )
}