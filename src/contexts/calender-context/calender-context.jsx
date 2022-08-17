import { createContext,useEffect, useState } from "react";
import { UserContext } from "../user-context/user-context";
import { getWeeks } from "../../IO/DataIO";
import { useContext } from "react";
export const CalenderContext = createContext({
    weeks:[],
    setWeeks:()=>{}
});


export const CalenderProvider = ({ children }) => {

    const [weeks, setWeeks] = useState([]);
    const {user} = useContext(UserContext);
    useEffect(() => {
        console.log('loading Calender')
        const f = (data) =>{
            console.log(data);
            if(data.length > 0)
                setWeeks(data);
        }
        getWeeks({...user},f);
    },[user]);

    const setWeeksData = (data) =>{

        setWeeks(data);
    }
    const cUpdateWeek = (data) =>{
        let tWeeks = [...weeks];
        console.log(data);
        for(var i = 0; i < tWeeks.length; i++)
        {
            
            if(tWeeks[i].id === data.id)
            {
                tWeeks[i] = data;
                console.log('found match');
            }
        }
        setWeeksData(tWeeks);
    }
    const value = {weeks, setWeeksData, cUpdateWeek};

    return <CalenderContext.Provider value={value}>{children}</CalenderContext.Provider>

    
}