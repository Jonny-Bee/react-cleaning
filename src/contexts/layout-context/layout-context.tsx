import { useContext ,FC} from "react";
import { createContext,useEffect, useState } from "react";
import { getLayouts } from "../../IO/DataIO";
import { UserContext } from "../user-context/user-context";

export type layout = {
    id:number,
    group_name:string,
    frequency:number,
    section:string,
    temp_check?:boolean
}

interface ILayoutContextProps{
    layouts:layout[],
    setLayouts:(a:layout[]) => void,
    group:string,
    setGroup:(a:string) => void,
    cUpdateLayout:(data:layout) => void
    
}
export const LayoutContext = createContext<ILayoutContextProps>({
    layouts:[],
    setLayouts:()=>{},
    group:'',
    setGroup:()=>{},
    cUpdateLayout:() => {}
        
});

interface ILayoutProviderProps{
    children:React.ReactNode;
}
export const LayoutContextProvider: FC<ILayoutProviderProps> = ({children}) =>{
    const [layouts, setLayouts] = useState<layout[]>([]);
    const [group, setGroup] = useState<string>('Ambient');
    const {user} = useContext(UserContext);

    const setLayoutsData = (data:layout[])=>{
        setLayouts(data);
    }

    useEffect(() => {
       // console.log('loading Layouts')
        const f = (data:layout[]) =>{
           // console.log(data);
            if(data.length > 0)
                setLayouts(data);
        }
        getLayouts({section:group.toString(),...user},f);
    },[group,user]);

    const cUpdateLayout = (data:layout) => {
        let tLayouts:layout[] = [...layouts];
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

    const value = {layouts, setLayoutsData, cUpdateLayout,group,setGroup,setLayouts};

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>

}
