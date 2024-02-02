import { Lives } from "../App"

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const HowToIcon = ({ setShow }: Props) => {
    const onClick = () => setShow(true)
    return (
        <button onClick={onClick}>?</button>
    )
}

export const HowTo = () => {
    return (
        <div>
            <h3>How to play</h3>
            <p>
                Simply pick any anime and the system will reveal properties about it.
                The color of each clue will show you how close you are to guessing the daily anime.
            </p>
            <p>
                <span className="box-mini red" />
                <span> </span>
                RED: <b>NONE</b> of the clues match.
            </p>
            <p>
                <span className="box-mini yellow" />
                <span> </span>
                YELLOW: <b>ONE OR MORE</b> clues are correct, but not all.
            </p>
            <p>
                <span className="box-mini green" />
                <span> </span>
                GREEN: <b>ALL</b> of the clues match.
            </p>
            <p>
                <span className="box-mini up" />
                <span> </span>
                <span className="box-mini down" />
                <span> </span>
                Arrows will tell you if the correct answer is below or above your guess.
            </p>
            <p>
                You have {Lives} chances to guess the daily anime.
            </p>
        </div>
    )
}