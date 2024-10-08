import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import Timer from "../components/Timer";
import ShowTeam from "../components/ShowTeam";

export default function Game({ progList }) {
    const mounted = useRef(false);
    const isReady = useRef(false);

    const [inputText, setInputText] = useState('');
    const [sendDisabled, setSendDisabled] = useState(false);

    const { setPage, topic, team, chat, setChat, channel, progress, setProgress } = useContext(AppContext);

    function nextProgress() {
        if (progress < 2) {
            setProgress(progress + 1);
            setInputText("");
            setSendDisabled(false);
            isReady.current = false;
            setPage("ready");
        }
        else setPage("result");
    }

    function send() {
        if (sendDisabled) return;
        const msg = `${team ? `찬성측 ${progList[progress]}` : `반대측 ${progList[progress]}`}: ${inputText}`;
        channel.send({
            type: 'broadcast',
            event: `debate${progress}`,
            payload: { message: msg },
        }).then(() => {
            if (isReady.current) nextProgress();
            else {
                isReady.current = true;
                setSendDisabled(true);
            }
            setChat(prevChat => [...prevChat, msg]);
        });
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            channel.on(
                'broadcast',
                { event: `debate${progress}` },
                (payload) => {
                    const data = payload.payload.message;
                    console.log(data);
                    if (isReady.current) nextProgress();
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
            <ShowTeam team={team} />
            <h2>양측 {progList[progress]}</h2>
            {chat.map((text, idx) => <div style={{
                backgroundColor: `${text.split(':', 1)[0].includes('찬성') ? "#d6efe7" : "#f5cfd3"}`,
                padding: "10px",
                margin: "10px",
                borderRadius: "16px",
                listStyleType: "unset",
            }} key={idx}>{text}</div>)}
            <textarea
                placeholder={`${progList[progress]}을 작성하세요!`}
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                rows="15"
                cols="70"></textarea>
            <button onClick={send} disabled={sendDisabled}>완료</button>
            <Timer ms={progress < 2 ? 5 * 60000 : 3 * 60000} onTimerEnd={send} />
        </>
    )
}