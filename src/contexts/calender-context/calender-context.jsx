import { createContext,useEffect, useState } from "react";
import { getWeeks } from "../../IO/DataIO";
export const CalenderContext = createContext({
    weeks:[],
    setWeeks:()=>{}
});


export const CalenderProvider = ({ children }) => {

    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        console.log('loading Calender')
        const f = (data) =>{
            console.log(data);
            if(data.length > 0)
                setWeeks(data);
        }
        getWeeks(f);
    },[]);

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