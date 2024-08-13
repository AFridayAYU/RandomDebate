import { useEffect, useRef, useState } from 'react';

export default function Timer({ onTimerEnd, ms }) {
    const mounted = useRef(false);
    const endTimeMillis = useRef(Date.now() + ms + 1000);
    const min = useRef(Math.floor(ms / 60000));
    const sec = useRef(Math.floor(ms / 1000) % 60);

    const [time, setTime] = useState(`${String(min.current).padStart(2, '0')}:${String(sec.current).padStart(2, '0')}`);

    function updateTime() {
        if (time === "END") return;
        const t = endTimeMillis.current - Date.now();
        if (t > 0) {
            min.current = t > 0 ? Math.floor(t / 60000) : 0
            sec.current = t > 0 ? Math.floor(t / 1000) % 60 : 0
            setTime(`${String(min.current).padStart(2, '0')}:${String(sec.current).padStart(2, '0')}`);
        }
        else {
            setTime("END");
            onTimerEnd();
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            console.log("TIMER_MOUNTED");
        }
        setTimeout(updateTime, 1000);
    }, [time]);
    return (
        <div style={
            {
                margin: "auto",
                width: "96px",
                padding: "12px",
                borderRadius: "32px",
                backgroundColor: "#D53E4F",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
            }
        }>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" viewBox="0 0 16 16">
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" />
            </svg>
            <div style={
                {
                    color: "#FFFFFF",
                    fontSize: "18px",
                    fontWeight: "bold",
                }
            }>{time}</div>
        </div>
    )
}