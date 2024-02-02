import { Lives } from "../App"

type Props = {
    win: boolean
    health: number
    show :boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const EndScreen = ({ win, health, show, setShow }: Props) => {
    const onClick = () => {
        setShow(false)
    }

    return (
        <div className='popup'
            style={{ visibility: show ? 'visible' : 'hidden' }}>
            <div className='popup-content'>
                <button className="close" onClick={onClick}>&times;</button>
                <div className='popup-body'>
                    {win? <p>Win</p> : <p>Lose</p>}
                    {"Guesses: " + (Lives - health)}
                </div>
            </div>
        </div>
    )
}