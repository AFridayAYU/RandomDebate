import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { createClient } from '@supabase/supabase-js';

function Secondpage() {
    const [code, setCode] = useState(Math.random().toString(36).substring(2,8));

    useEffect(() => {
        console.log('생성');
        const supabase = createClient("https://dyjdsfiutbdavklmudjw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5amRzZml1dGJkYXZrbG11ZGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTYyOTE3OCwiZXhwIjoyMDM3MjA1MTc4fQ.qD5MV7L_8IFvbDa27t2Trk0YJdtYPRoflywcuwGi8XI")
        supabase.from('room_list').insert({id: code, start: false}).then((err) => {
            const channel = supabase.channel(code);
            
            // channel.on(
            //     'broadcast',
            //     { event: 'connect' },
            //     (payload) => {
            //         console.log(payload);
            //     }
            // );

            channel.subscribe((status) => {
                if (status !== 'SUBSCRIBED') return;
            });
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