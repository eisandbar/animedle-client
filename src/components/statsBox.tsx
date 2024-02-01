type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const StatsBoxIcon = ({ setShow }: Props) => {
    const onClick = () => setShow(true)
    return (
        <button onClick={onClick}>Stats</button>
    )
}

type BoxProps = {
    stats: Stats
}

export const StatsBox = ({ stats }: BoxProps) => {
    return (
        <div>
            <h3>My Stats</h3>
            <p>
                <b>Games finished: {stats.games}</b>
            </p>
            <p>
                <b>Average guesses: {stats.guesses / stats.games} </b>
            </p>
            <p>
                <b>Streak: {stats.streak}</b>
            </p>
        </div>
    )
}

export type Stats = {
    games: number
    guesses: number
    streak: number
}