import { location } from "../../contexts/location-context/location-context";

interface IWeeklyRowProps{
  location:location,
  count:number
}
const WeeklyRow = ({location,count}:IWeeklyRowProps) => {

    const bgClass = count % 2 === 1 ? 'p_odd_row' : '';
   
  
    const myDate = new Date(location.last_clean);

    
        return(
          <>
            <tr className={bgClass } >
              <td className='p_cell p_bold'>{location.group_name.toUpperCase()}</td>
              <td className='p_cell  p_center'>{location.bay}</td>
              <td className='p_cell  p_center'>{myDate.toLocaleDateString()}</td>
              <td className={'p_cell p_center'}>&ensp;&ensp;/&ensp;&ensp;/&ensp;&ensp;</td>
              <td className='p_cell '></td>    
            </tr>
          </>
        )
}

export default WeeklyRow;