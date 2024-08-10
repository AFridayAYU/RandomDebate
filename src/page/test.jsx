import { useContext } from "react";
import Timer from "../components/Timer";
import { AppContext } from "../App";

export default function Test() {
    const {setPage} = useContext(AppContext)
    return (
        <>
            <h1>TEST</h1>
            <Timer ms={30*1000} onTimerEnd={() => setPage("main")} />
        </>
    )
}