import { useContext , useEffect, useState} from "react";
import { AppContext } from "../App";


export default function Test() {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    const {setPage, topic, team} = useContext(AppContext);

    useEffect(() => {
        setTimeout(() => {
            setPage("test2");
        }, 5000)

    }, []);

    return (
        <>
        <h2>{topic}</h2>
        <h2>양측 입론</h2>
        <textarea placeholder="입론을 작성하세요!"
        value={inputText}
        onChange={handleInputChange}
        rows="15"
        cols="70"></textarea>
        <button onClick={() => setPage("test2")}>완료</button>
        </>
    )
}