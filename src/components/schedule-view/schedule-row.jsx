


const ScheduleRow = (props) => {
    
    const highlightWeeks = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    const last_clean = new Date(props.location.last_clean);
    const future_cleaning = [];

    const checkPromo = (dateString) =>{
        
        for(var i = 0 ; i < props.promo.length;i++)
        {
            if(props.promo[i].is_promo || props.promo[i].is_seasonal)
            {
                let tDate = new Date(props.promo[i].start_date);
                if(tDate.toLocaleDateString() === dateString)
                    return true;
            }
        }
        return false;
    }

    

    for(var i = 0; i < 30; i++)
    {
        let tClean = new Date(last_clean);
        tClean.setDate(tClean.getDate() + ((props.location.frequency * 7) * i));
        tClean.setDate(tClean.getDate()  - tClean.getDay());
        future_cleaning.push(tClean);
        
        
    }
    const isCleaningWeek = (date) => {
        for(var k = 0; k < future_cleaning.length; k++)
        {
            let tClean = future_cleaning[k];
            if(tClean < props.weeks[0] || tClean > props.weeks[12])
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
    const findNearestWeek = (idx) => {
        
        for(var i = 1; i <= props.weeks.length; i++)
        {
            let b = idx - i;
            let a = idx + i;
            
            if(b >= 0)
                if(!checkPromo(props.weeks[b].toLocaleDateString()))
                    return b;
            if(a <= 13)
                if(!checkPromo(props.weeks[a].toLocaleDateString()))
                    return a;
        }
        return -1;
    }
    
    for(var j=0;j<props.weeks.length;j++)
    {
        
           
        if( checkPromo(props.weeks[j].toLocaleDateString()))
        {
            highlightWeeks[j] = 2;
            if(isCleaningWeek(props.weeks[j]))
            {
                let w = findNearestWeek(j);
                if(w > -1)
                    highlightWeeks[w] = 1;
                

            }
            
        }
        else{
            if(isCleaningWeek(props.weeks[j]))
                highlightWeeks[j] = 1;
        }
            
        
            
    }
    
   
    
    const getHighlight = (n) => {
        return n === 0 ? '' : n === 1 ? ' p_highlight' : ' p_promo';
    }
    const bgClass = props.count % 2 === 0 ? 'p_odd_row' : '';
    return(<>

        <tr className={bgClass}>
            <td className='p_cell p_heading p_bold'>{props.location.group_name}</td>
            <td className='p_cell p_center' width='3%'>{props.location.bay}</td>
            {
                highlightWeeks.map((n)=>( <td key={props.location.bay_id + 'hl'+ n  + Math.random()}className={'p_cell p_center'+ getHighlight(n)} width='6%'>&ensp;&ensp;/&ensp;&ensp;/&ensp;&ensp;</td>))
            }
        </tr>


        <tr className={bgClass}>
            <td className='p_cell'>Signed</td>
            <td className='p_cell p_center' width='3%'></td>
            {
                highlightWeeks.map((n)=>( <td key={props.location.bay_id + 'hd'+ n + Math.random()}className={'p_cell p_center'+ getHighlight(n)} width='6%'></td>))
            }

        </tr>
        <tr > <td colSpan={15}>-</td></tr>
    
    
    </>)
}
export default ScheduleRow;