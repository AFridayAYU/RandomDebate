import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';


function Secondpage() {
    const [code, setCode] = useState(Math.random().toString(36).substring(2,8));
    const navigate = useNavigate();

    useEffect(() => {
        console.log('생성');
        const supabase = createClient("https://dyjdsfiutbdavklmudjw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5amRzZml1dGJkYXZrbG11ZGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTYyOTE3OCwiZXhwIjoyMDM3MjA1MTc4fQ.qD5MV7L_8IFvbDa27t2Trk0YJdtYPRoflywcuwGi8XI")
        supabase.from('room_list').insert({id: code, start: false}).then((err) => {
            const channel = supabase.channel(code);
            
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
                        const selectedTopic = topic[Math.floor(Math.random() * topic.length)]
                        const team = Math.floor(Math.random() * 2)

                        channel.send({
                            type: 'broadcast',
                            event: 'topic',
                            payload: { message: {
                                team: team === 0 ? 1 : 0,
                                topic : selectedTopic
                            } },
                        }).then((err) => console.log("주재, 팀 정보 전송?", err));
                    }
                }
            );

            channel.subscribe();
        });
        return () => {
            console.log('삭제');
        }
    }, []);
    return (
        <>
            <h2>초대코드</h2>
            <div>
                {code}
            </div>
            <BackButton />
        </>
    )
}

export default Secondpage;