import { week } from "../../contexts/calender-context/calender-context";
import type {location} from "../../contexts/location-context/location-context";

interface IScheduleRowProps{
    location:location,
    promo:week[],
    weeks:Date[],
    count:number



}
const ScheduleRow = ({location,promo,weeks,count}:IScheduleRowProps) => {
    
    const highlightWeeks = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    const last_clean = new Date(location.last_clean);
    const future_cleaning:Date[] = [];

    const checkPromo = (dateString:string) =>{
        
        for(var i = 0 ; i < promo.length;i++)
        {
            if(promo[i].is_promo || promo[i].is_seasonal)
            {
                let tDate = new Date(promo[i].start_date);
                if(tDate.toLocaleDateString() === dateString)
                    return true;
            }
        }
        return false;
    }

    for(var i = 0; i < 30; i++)
    {
        let tClean = new Date(last_clean);
        tClean.setDate(tClean.getDate() + ((location.frequency * 7) * i));
        tClean.setDate(tClean.getDate()  - tClean.getDay());
        future_cleaning.push(tClean);  
    }

    const isCleaningWeek = (date:Date) => {
        for(var k = 0; k < future_cleaning.length; k++)
        {
            let tClean = future_cleaning[k];
            if(tClean < weeks[0] || tClean > weeks[12])
            {
                    // do nothing
            }
            else
            {
                if(date.toLocaleDateString() === tClean.toLocaleDateString())
                {
                    return true;
                }
            }
        }
        return false;
    }
   
    const findNearestWeek = (idx:number) => {
        
        for(var i = 1; i <= weeks.length; i++)
        {
            let b = idx - i;
            let a = idx + i;
            
            if(b >= 0)
                if(!checkPromo(weeks[b].toLocaleDateString()))
                    return b;
            if(a <= 13)
                if(!checkPromo(weeks[a].toLocaleDateString()))
                    return a;
        }
        return -1;
    }
    
    for(var j=0;j< weeks.length;j++)
    {
        
           
        if( checkPromo(weeks[j].toLocaleDateString()))
        {
            highlightWeeks[j] = 2;
            if(isCleaningWeek(weeks[j]))
            {
                let w = findNearestWeek(j);
                if(w > -1)
                    highlightWeeks[w] = 1;
                

            }
            
        }
        else{
            if(isCleaningWeek(weeks[j]))
                highlightWeeks[j] = 1;
        }
            
        
            
    }
    
   
    
    const getHighlight = (n:number) => {
        return n === 0 ? '' : n === 1 ? ' p_highlight' : ' p_promo';
    }
    const bgClass = count % 2 === 0 ? 'p_odd_row' : '';
    return(<>

        <tr className={bgClass}>
            <td className='p_cell p_heading p_bold'>{location.group_name}</td>
            <td className='p_cell p_center' width='3%'>{location.bay}</td>
            {
                highlightWeeks.map((n)=>( <td key={location.bay_id + 'hl'+ n  + Math.random()}className={'p_cell p_center'+ getHighlight(n)} width='6%'>&ensp;&ensp;/&ensp;&ensp;/&ensp;&ensp;</td>))
            }
        </tr>


        <tr className={bgClass}>
            <td className='p_cell'>Signed</td>
            <td className='p_cell p_center' width='3%'></td>
            {
                highlightWeeks.map((n)=>( <td key={location.bay_id + 'hd'+ n + Math.random()}className={'p_cell p_center'+ getHighlight(n)} width='6%'></td>))
            }

        </tr>
        {!location.temp_check ? '' : (
            <tr className={bgClass}>
            <td className='p_cell'>Restock Temp</td>
            <td className='p_cell p_center' width='3%'></td>
            {
                highlightWeeks.map((n)=>( <td key={location.bay_id + 'hd'+ n + Math.random()}className={'p_cell p_center'+ getHighlight(n)} width='6%'></td>))
            }
            </tr>
        )}
        <tr ><td colSpan={15}>-</td></tr>
    
    
    </>)
}
export default ScheduleRow;