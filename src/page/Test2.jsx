import { useContext , useEffect } from "react";
import { AppContext } from "../App";

export default function Test2() {
    const {chat, setChat, setPage} = useContext(AppContext);

    useEffect(() => {
        setTimeout(() => {
            setPage("test3");
        }, 5000)

    }, []);

    return(
        <>
        <h2>test2</h2>
        <ul>
            {chat.map((text, idx) => <li key={idx}>{text}</li>)}
        </ul>
        <p> 5초뒤 반론이 시작됩니다! </p>
        </>
    )

}