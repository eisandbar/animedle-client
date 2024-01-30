import '../css/box.css'


export type Box = {
    type: string
    text: string
}

type Props = { 
    box: Box
}

export const Box = ({box}: Props) => {
    console.log(box)
    return (
        <div className={`box ${box.type}`}>
            {box.text}
        </div>
    )
}