import { createContext, useState } from "react";
import { getWeeks } from "../../IO/DataIO";

export const UserContext = createContext({
    user:{},
    setUser:()=>{},
    setUserObject:()=>{}
});


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);

   

    const setUserObject = (data) =>{
        console.log('set user called with ' + data)
        setUser(data);
    }
   
    const value = {user, setUserObject};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

    
}