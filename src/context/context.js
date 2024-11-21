import { createContext, useEffect, useState } from "react";

export const UsernameContext = createContext()

export default function UserNameProvider({children}) {
    let [username, setUsername] = useState(()=>{
        const storedUsername = localStorage.getItem("username")
        return storedUsername || 'user'
    })

    useEffect(()=>{
if(username){
    localStorage.setItem("username", username)
}
    },[username])
    return (
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    )
}