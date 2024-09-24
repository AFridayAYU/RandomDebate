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
                {chat.map((text, idx) => <li key={idx}>{text}</li>)}
            </ul>
            <h2>{`5초후 ${progList[progress]}이 진행됩니다.`}</h2>
        </>
    )
}