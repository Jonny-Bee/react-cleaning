import { createContext, useState , FC } from "react";


export type user_object = {
    [key: string]: string ;
    user_name:string,
    store_number:string,
    hash:string
}

interface IuserContextProps{
    user:user_object,
    setUserObject:(a:user_object) => void
}

export const UserContext = createContext<IuserContextProps>({
    user:{user_name:'',store_number:'',hash:''},
    setUserObject:()=>{}
});

interface IUserProviderProps{
    children:React.ReactNode,
}
export const UserProvider : FC<IUserProviderProps>= ({ children }) => {

    let blankUser:user_object = {user_name:'',store_number:'-1',hash:''};

    const [user, setUser] = useState<user_object>(blankUser);

   

    const setUserObject = (data:user_object) =>{
       
        setUser(data);
    }
   
    const value = {user, setUserObject};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

    
}