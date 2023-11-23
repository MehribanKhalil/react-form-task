import { useState } from 'react'
import { useEffect } from 'react'

const useLocalStorage = (key) => {
      const [local, setLocal] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [])
    

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(local));
    }, [local])
        
    const getUserInfo =(value)=>{
        setLocal( [...local, value]);
    }
    return ([
        local, getUserInfo
    ])
}

export default useLocalStorage