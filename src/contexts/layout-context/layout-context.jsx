import { useContext } from "react";
import { createContext,useEffect, useState } from "react";
import { getLayouts } from "../../IO/DataIO";
import { UserContext } from "../user-context/user-context";
export const LayoutContext = createContext({
    layouts:[],
    setLayouts:()=>{},
    group:null,
    setGroup:()=>{}
});

export const LayoutContextProvider = ({children}) =>{
    const [layouts, setLayouts] = useState([]);
    const [group, setGroup] = useState('Ambient');
    const {user} = useContext(UserContext);

    const setLayoutsData = (data)=>{
        setLayouts(data);
    }
    useEffect(() => {
       // console.log('loading Layouts')
        const f = (data) =>{
           // console.log(data);
            if(data.length > 0)
                setLayouts(data);
        }
        getLayouts({section:group,...user},f);
    },[group,user]);

    const cUpdateLayout = (data) => {
        let tLayouts = [...layouts];
       // console.log(data);
        for(var i = 0; i < tLayouts.length; i++)
        {
            
            if(tLayouts[i].id === data.id)
            {
                tLayouts[i] = data;
                //console.log('found match');
            }
        }
        setLayouts(tLayouts);
    }

    const value = {layouts, setLayoutsData, cUpdateLayout,group,setGroup};

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>

}
