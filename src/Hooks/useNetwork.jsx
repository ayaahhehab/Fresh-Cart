import React, { useEffect, useState } from 'react'

export default function useNetwork() {
    const [isOnline, setisOnline] = useState(true)

    useEffect (()=>{
        detectOnline();
    },[])
    function detectOnline(){
        window.addEventListener('online', function(){
        setisOnline(true);
        console.log('online');
         });
        window.addEventListener('offline', function(){
            setisOnline(false);
            console.log('offline');
        });
    }
    return <>
    {isOnline? <div className='network'>you are online</div>:<div className='network'><i className='fas fa-wifi'></i>you are offline</div>}
    </>
}
