import { useContext , useEffect, useRef, useState} from "react";
import { AppContext } from "../App";
import Timer from "../components/Timer";

export default function Test() {
    const [inputText, setInputText] = useState('');
    const isReady = useRef(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    const {setPage, topic, channel} = useContext(AppContext);

    function send() {
        channel.send({
            type: 'broadcast',
            event: 'debate',
            payload: { message: inputText },
        }).then(() => {
            if (isReady.current) {
                setPage("test2");
            }
            else {
                isReady.current = true;
            }
        });
    }

    useEffect(() => {
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
            }
        );
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
        <button onClick={send}>완료</button>
        <Timer ms={30*1000} onTimerEnd={send} />
        </>
    )
}