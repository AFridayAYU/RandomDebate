import { useContext , useEffect, useState} from "react";
import ShowTeam from "../components/ShowTeam";
import { AppContext } from "../App";

export default function GameReady() {
    const {setPage, topic, team} = useContext(AppContext);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        setTimeout(() => {
            setPage("test");
        }, 5000)

    }, []);

    return (
        <>
        <h2>토론 주제</h2>
        <h2>{topic}</h2>
        <ShowTeam team={team} />
        <h2> 5초후 게임이 실행됩니다.</h2>
        
        
        </>
    )
}