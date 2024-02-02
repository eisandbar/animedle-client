import { Response } from "./resultBox"
import { ChangeEvent, useEffect, useRef, useState } from "react"

const Delay = 300

type Props = {
    health: number
    results: Response[]
    setResults: React.Dispatch<React.SetStateAction<Response[]>>
}


export const InputBar = ({health, results, setResults}: Props) => {
    /**
    * Comments
    */
    const [text, setText] = useState("")
    const [id, setId] = useState(0)
    const [suggestions, setSuggestions] = useState<Anime[]>([])
    const timeoutId = useRef(0)

    /**
    * Called on form submission. 
    * Sends Get request to the API /guess handle
    * Extends results with the response
    * Clears form input text
    */
    const onSubmit = async () => {
        if (id == 0 || health <= 0 || isRepeat()) return
        setText("")
        const response = await fetch(encodeURI(`http://localhost:8080/guess?id=${id}`))
        const result: Response = await response.json()
        setResults([result, ...results])
    }

    useEffect(() => {
        if (text.length > 1) {
            getAnime(text)
        } else {
            setSuggestions([])
        }
    }, [text])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        setId(0)
    }


    /**
    * Uses a debounce pattern to limit api calls
    * Called on changes to form input text
    * Sends Get requests to the API /search handle
    * Updates suggestions array to the new result
    */
    const getAnime = async (query: string): Promise<void> => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(async () => {
            const response = await fetch(encodeURI(`http://localhost:8080/search?q=${query}`))
            const result: Anime[] = await response.json()
            setSuggestions(result)
        }, Delay)
    }

    const isRepeat = (): boolean => {
        for (const res of results) {
            if (res.title.text == text) {
                return true
            }
        }
        return false
    }

    return (
        <div className="input">
            <input type="text" placeholder="Type an anime to begin..." onChange={onChange} value={text} />
            <button onClick={onSubmit} >Guess</button>
            <div className="suggestions">
                {id == 0 ? suggestions.map((item) => {
                    return <InputSuggestion setId={setId} setText={setText} id={item.id} title={item.title} key={item.id} />
                }) : null}
            </div>
        </div>
    )
}

type SuggestionProps = {
    setText: React.Dispatch<React.SetStateAction<string>>
    setId: React.Dispatch<React.SetStateAction<number>>
    id: number
    title: string
}

const InputSuggestion = (props: SuggestionProps) => {
    const onClick = () => {
        props.setText(props.title)
        props.setId(props.id)
    }
    return (
        <li className="suggestion" onClick={onClick}>{props.title}</li>
    )
}

export type Anime = {
    id: number
    title: string
}