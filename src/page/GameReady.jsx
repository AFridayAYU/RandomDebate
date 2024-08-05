import { useContext } from "react";
import ShowTeam from "../components/ShowTeam";
import { AppContext } from "../App";

export default function GameReady() {
    const {topic, team} = useContext(AppContext);

    return (
        <>
        <h2>토론 주제</h2>
        <h2>{topic}</h2>
        <ShowTeam team={team} />
        </>
    )
}