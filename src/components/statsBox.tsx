type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const StatsBoxIcon = ({setShow}: Props) => {
    const onClick = () => setShow(true)
    return (
        <button onClick={onClick}>Stats</button>
    )
}

export const StatsBox = () => {
    return (
        <div>
            <h3>My Stats</h3>
            <p>
                <b>Games played:</b>
            </p>
            <p>
                <b>Average guesses:</b>
            </p>
            <p>
                <b>Streak:</b>
            </p>
        </div>
    )
}