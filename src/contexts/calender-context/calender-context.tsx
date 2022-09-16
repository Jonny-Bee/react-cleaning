import React, { createContext,useEffect, useState ,FC} from "react";
import { UserContext } from "../user-context/user-context";
import { getWeeks } from "../../IO/DataIO";
import { useContext } from "react";

export type week = {
    id:number,
    start_date:string,
    is_promo:boolean,
    is_seasonal:boolean
}

interface ICalenderContextProps{
    weeks:week[],
    setWeeks:(weeks:week[]) => void,
    cUpdateWeek: (data:week) => void

}

interface ICalenderProviderProps{
    children:React.ReactNode;
}
export const CalenderContext = createContext<ICalenderContextProps>({
    weeks:[],
    setWeeks:()=>{},
    cUpdateWeek:() =>{}
});


export const CalenderProvider: FC<ICalenderProviderProps> = ({ children }) => {

    const [weeks, setWeeks] = useState<week[]>([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
       // console.log('loading Calender')
        const f = (data:week[]) =>{
          //  console.log(data);
            if(data.length > 0)
                setWeeks(data);
        }
        getWeeks(f);
    },[]);

    const setWeeksData = (data:week[]) =>{

        setWeeks(data);
    }

    const cUpdateWeek = (data:week) =>{
        let tWeeks:week[] = [...weeks];
        //console.log(data);
        for(var i = 0; i < tWeeks.length; i++)
        {
            
            if(tWeeks[i].id === data.id)
            {
                tWeeks[i] = data;
               // console.log('found match');
            }
        }
        setWeeksData(tWeeks);
    }

    const value = {weeks, setWeeksData, cUpdateWeek, setWeeks};

    return <CalenderContext.Provider value={value}>{children}</CalenderContext.Provider>

    
}