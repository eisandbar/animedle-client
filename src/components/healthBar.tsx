import '../css/healthBar.css'

type Props = {
    health: number
}

const MaxHealth = 10

export const HealthBar = ({ health }: Props) => {
    const lives: boolean[] = Array(MaxHealth).fill(false)
    for (let i = 0; i < health && i < MaxHealth; i++) {
        lives[i] = true
    }

    return (
        <div className='health-bar'>
            {lives.map((alive: boolean) => {
                return alive ? <div className='heart'></div> : <div className='heart-empty'></div>
            })}
        </div>
    )
}