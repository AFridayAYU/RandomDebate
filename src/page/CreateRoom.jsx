import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../App';
import BackButton from '../components/BackButton';
import supabase from '../supabase';

function CreateRoom() {
    const codeRef = useRef();
    const {setPage, setTeam, setTopic, setChannel, setCode} = useContext(AppContext);

    useEffect(() => {
        console.log('생성');
        codeRef.current = Math.random().toString(36).substring(2,8)
        setCode(codeRef.current);
        supabase.from('room_list').insert({id: codeRef.current, start: false}).then((err) => {
            const channel = supabase.channel(codeRef.current);
            setChannel(channel);
            channel.on(
                'broadcast',
                { event: 'connect' },
                (payload) => {
                    console.log(payload);
                    if (payload.payload.message === "CONNECT") {
                        const topic = [
                            '최저임금을 인상해야 하는가',
                            '기후 변화 문제에 대해 개인의 노력이 중요한가',
                            '사형제도가 필요한가',
                            '온라인 교육이 오프라인 교육보다 효과적인가',
                            '소셜미디어는 사회적으로 긍정적인 효과를 보이는가'
                        ];
                        const selectedTopic = topic[Math.floor(Math.random() * topic.length)];
                        const team = Math.floor(Math.random() * 2);
                        setTeam(team);
                        setTopic(selectedTopic);

                        channel.send({
                            type: 'broadcast',
                            event: 'topic',
                            payload: { message: {
                                team: team === 0 ? 1 : 0,
                                topic : selectedTopic
                            } },
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
        <>
        <h2>초대코드</h2>
        {codeRef.current}
        <BackButton onClick={() => supabase.from('room_list').delete().eq('id', codeRef.current).then(() => setPage("main"))} />
        </>
    )
}

export default CreateRoom;