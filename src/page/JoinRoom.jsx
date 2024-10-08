import React, { useRef, useContext } from 'react';
import BackButton from '../components/BackButton';;
import { AppContext } from '../App';
import supabase from '../supabase';

function JoinRoom() {
    const codeInputRef = useRef();
    const { setPage, setTeam, setTopic, setChannel, setCode } = useContext(AppContext);


    function onClick() {
        supabase.from('room_list').select('*').eq('id', codeInputRef.current.value).then((result) => {
            console.log(result);
            if (result.data.length === 0) {
                alert("존재하지 않는 방입니다.")
            }
            else {
                // alert("성공")
                setCode(codeInputRef.current.value);
                const channel = supabase.channel(result.data[0].id);
                setChannel(channel);
                channel.subscribe((status) => {
                    channel.on(
                        'broadcast',
                        { event: 'topic' },
                        (payload) => {
                            const data = payload.payload.message;
                            setTeam(data.team);
                            setTopic(data.topic);
                        }
                    );
                    channel.send({
                        type: 'broadcast',
                        event: 'connect',
                        payload: { message: 'CONNECT' },
                    });
                });
                setPage("ready");
            }
        })
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //gap: "1rem",
        }}>
            <h2>코드입력</h2>
            <input style={{
                width: "8rem",
                height: "2rem",
                fontSize: "2rem",
                textAlign: "center",
                borderRadius: "0.5rem",
            }} type="text" maxLength={6} ref={codeInputRef} />
            <button onClick={onClick}>시작</button>
            <button onClick={() => setPage("main")}>뒤로가기</button>
        </div>
    )
}

export default JoinRoom;