import { useContext } from "react";
import { AppContext } from "../App";

export default function Test2() {
    const {chat, setChat} = useContext(AppContext);
    return(
        <>
        <h2>test2</h2>
        <ul>
            {chat.map((text, idx) => <li key={idx}>{text}</li>)}
        </ul>
        </>
    )

}