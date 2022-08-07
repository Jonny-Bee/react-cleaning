
const WeeklyRow = (props) => {

    const bgClass = props.count % 2 === 1 ? 'p_odd_row' : '';
   
  
    const myDate = new Date(props.location.last_clean);

    
        return(
          <>
            <tr className={bgClass } >
              <td className='p_cell p_bold'>{props.location.group_name.toUpperCase()}</td>
              <td className='p_cell  p_center'>{props.location.bay}</td>
              <td className='p_cell  p_center'>{myDate.toLocaleDateString()}</td>
              <td className={'p_cell p_center'}>&ensp;&ensp;/&ensp;&ensp;/&ensp;&ensp;</td>
              <td className='p_cell '></td>    
            </tr>
          </>
        )
}

export default WeeklyRow;