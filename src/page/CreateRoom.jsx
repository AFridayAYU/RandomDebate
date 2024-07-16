import React from 'react';
import BackButton from '../components/BackButton';

function Secondpage() {
    return (
        <>
            <h2>초대코드</h2>
            <div>
                {Math.random().toString(36).substring(2,8)}
            </div>
            <BackButton />
        </>
    )
}

export default Secondpage;