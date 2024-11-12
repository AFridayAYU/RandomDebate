import { useContext, useEffect } from "react";
import ShowTeam from "../components/ShowTeam";
import { AppContext } from "../App";

export default function GameReady({ progList }) {
    const { setPage, topic, team, chat, progress } = useContext(AppContext);

    useEffect(() => {
        console.log(topic);
        setTimeout(() => {
            setPage("game");
        }, 5000)

    }, []);

    return (
        <>
            <h2>토론 주제</h2>
            <h2>{topic}</h2>
            <ShowTeam team={team} />
            <ul>
            {chat.map((text, idx) => <div style={{
                backgroundColor: `${text.split('₩', 1)[0].includes('찬성') ? "#d6efe7" : "#f5cfd3"}`,
                padding: "10px",
                margin: "10px",
                borderRadius: "16px",
                listStyleType: "unset",
            }} key={idx}>
                <div style={{textAlign: `${text.split('₩', 1)[0].includes('찬성') ? "left" : "right"}`,}}>
                    <b>{text.split('₩', 1)[0]}</b>
                </div>
                <p style={{textAlign: 'left'}}>{text.split('₩', 2)[1]}</p>
            </div>
            )}
            </ul>
            <h2>{`5초후 ${progList[progress]}이 진행됩니다.`}</h2>
        </>
    )
}