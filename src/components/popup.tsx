import '../css/popup.css'

type Props = {
    children: React.ReactNode
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const Popup = ({children, show, setShow}: Props) => {
    const onClick = () => {
        setShow(false)
    }

    return (
        <div className='popup' 
        style={{visibility: show ? 'visible' : 'hidden' }}>
            <div className='popup-content'>
                <button className="close" onClick={onClick}>&times;</button>
                <div className='popup-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}