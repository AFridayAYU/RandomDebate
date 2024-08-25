import { useContext , useEffect, useRef, useState} from "react";
import { AppContext } from "../App";
import Timer from "../components/Timer";

export default function Test3(){
    const [inputText, setInputText] = useState('');
    const {setPage, topic, team, chat, setChat, channel} = useContext(AppContext);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    
    return(
        <>
        <h2>{topic}</h2>
        <h2>반론</h2>
        <ul>
            {chat.map((text, idx) => <li key={idx}>{text}</li>)}
        </ul>
        <textarea 
            placeholder="반론을 작성하세요!"
            value={inputText}
            onChange={handleInputChange}
            rows="15"
            cols="70"></textarea>
        </>
    )

}