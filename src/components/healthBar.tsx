import { Lives } from '../App'
import '../css/healthBar.css'

type Props = {
    health: number
}

export const HealthBar = ({ health }: Props) => {
    const lives: boolean[] = Array(Lives).fill(false)
    for (let i = 0; i < health && i < Lives; i++) {
        lives[i] = true
    }

    return (
        <div className='health-bar'>
            {lives.map((alive: boolean, id: number) => {
                return alive ? <div className='heart' key={id}></div> : <div className='heart-empty' key={id}></div>
            })}
        </div>
    )
}