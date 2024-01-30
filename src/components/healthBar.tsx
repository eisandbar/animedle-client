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
            {lives.map((alive: boolean, id: number) => {
                return alive ? <div className='heart' key={id}></div> : <div className='heart-empty' key={id}></div>
            })}
        </div>
    )
}