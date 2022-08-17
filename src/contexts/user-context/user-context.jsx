import { createContext, useState } from "react";
import { getWeeks } from "../../IO/DataIO";

export const UserContext = createContext({
    user:{},
    setUser:()=>{}
});


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);

   

    const setUserObject = (data) =>{

        setUser(data);
    }
   
    const value = {user, setUserObject};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

    
}