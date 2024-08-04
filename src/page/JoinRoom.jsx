import React, { useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import ShowTeam from "../components/ShowTeam";

function Thirdpage() {
    const [isStarted, setIsStarted] = useState(false);
    const codeInputRef = useRef();
    const navigate = useNavigate();


    function onClick() {
        const supabase = createClient("https://dyjdsfiutbdavklmudjw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5amRzZml1dGJkYXZrbG11ZGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTYyOTE3OCwiZXhwIjoyMDM3MjA1MTc4fQ.qD5MV7L_8IFvbDa27t2Trk0YJdtYPRoflywcuwGi8XI")
        supabase.from('room_list').select('*').eq('id', codeInputRef.current.value).then((result) => {
            console.log(result);
            if (result.data.length === 0) {
                alert("존재하지 않는 방입니다.")
            }
            else {
                // alert("성공")
                const channel = supabase.channel(result.data[0].id);
                channel.subscribe((status) => {
                    channel.on(
                        'broadcast',
                        { event: 'topic' },
                        (payload) => {
                            console.log(payload);
                        }
                    );
                    channel.send({
                        type: 'broadcast',
                        event: 'connect',
                        payload: { message: 'CONNECT' },
                    });
                });
                setIsStarted(true);
            }
        })
    }
    return(
        <>
        {isStarted ? (
            <div>
                <h2>토론 주제</h2>
                <ShowTeam isPros={Math.floor(Math.random() * 2)} />
            </div>

        ):(
            <div>
        <h2>코드입력</h2>
        <input type="text" maxlength="6" ref={codeInputRef}/>
        <button onClick={onClick}>시작</button>
        <BackButton/>
        </div>
    )}

        </>
    )
}

export default Thirdpage;