import '../css/box.css'

type Props = {
    children: React.ReactNode
    type: string
}

export const Box = ({ children, type}: Props) => {
    return (
        <div className={`box ${type}`}>
            {children}
        </div>
    )
}