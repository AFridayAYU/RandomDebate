import { useContext , useEffect, useRef, useState} from "react";
import { AppContext } from "../App";
import Timer from "../components/Timer";

export default function Test() {
    const mounted = useRef(false)
    const [inputText, setInputText] = useState('');
    const isReady = useRef(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    const {setPage, topic, team, chat, setChat, channel} = useContext(AppContext);

    function send() {
        const msg = `${team ? "찬성" : "반대"}: ${inputText}`;
        channel.send({
            type: 'broadcast',
            event: 'debate',
            payload: { message: msg },
        }).then(() => {
            if (isReady.current) {
                setPage("test2");
            }
            else {
                isReady.current = true;
            }
            setChat(prevChat => [...prevChat, msg]);
        });
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            channel.on(
                'broadcast',
                { event: 'debate' },
                (payload) => {
                    const data = payload.payload.message;
                    console.log(data);
                    if (isReady.current) {
                        setPage("test2");
                    }
                    else {
                        isReady.current = true;
                    }
                    setChat(prevChat => [...prevChat, data]);
                }
            );
        }
        else {
            console.log(chat);
        }
    }, [chat]);

    return (
        <>
        <h2>{topic}</h2>
        <h2>양측 입론</h2>
        <ul>
            {chat.map((text, idx) => <li key={idx}>{text}</li>)}
        </ul>
        <textarea 
            placeholder="입론을 작성하세요!"
            value={inputText}
            onChange={handleInputChange}
            rows="15"
            cols="70"></textarea>
        <button onClick={send}>완료</button>
        <Timer ms={30*1000} onTimerEnd={send} />
        </>
    )
}