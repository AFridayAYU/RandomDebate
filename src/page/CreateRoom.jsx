import React, { useEffect, useContext, useRef } from 'react';
import { AppContext } from '../App';
import BackButton from '../components/BackButton';
import supabase from '../supabase';

function CreateRoom() {
    const codeRef = useRef();
    const checkBoxRef = useRef();
    const { topicAll, setPage, setTeam, setTopic, setChannel, setCode } = useContext(AppContext);

    useEffect(() => {
        console.log('생성');
        codeRef.current = Math.random().toString(36).substring(2, 8)
        setCode(codeRef.current);
        supabase.from('room_list').insert({ id: codeRef.current, start: false }).then((err) => {
            const channel = supabase.channel(codeRef.current);
            console.log(supabase.getChannels());
            setChannel(channel);
            channel.on(
                'broadcast',
                { event: 'connect' },
                (payload) => {
                    console.log(payload);
                    if (payload.payload.message === "CONNECT") {
                        const selectedTopic = checkBoxRef.current.checked ? '최저임금을 인상하여야 한다.' : topicAll[Math.floor(Math.random() * topicAll.length)];
                        console.log(selectedTopic);
                        const team = Math.floor(Math.random() * 2);
                        setTeam(team);
                        setTopic(selectedTopic);

                        channel.send({
                            type: 'broadcast',
                            event: 'topic',
                            payload: {
                                message: {
                                    team: team === 0 ? 1 : 0,
                                    topic: selectedTopic
                                }
                            },
                        }).then((result) => {
                            if (result === "ok") setPage("ready");
                        });
                    }
                }
            );

            channel.subscribe();
        });
        return () => {
        }
    }, []);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <h2>초대코드</h2>
            <p style={{
                fontWeight: "bold",
                fontSize: "2rem",
            }}>{codeRef.current}</p>
            <input type='checkbox' ref={checkBoxRef} name='test'/>
            <label htmlFor='test'>테스트 게임</label>
            <button onClick={() => supabase.from('room_list').delete().eq('id', codeRef.current).then(() => {
                supabase.removeAllChannels();
                setPage("main");
            })}>뒤로가기</button>
        </div>
    )
}

export default CreateRoom;