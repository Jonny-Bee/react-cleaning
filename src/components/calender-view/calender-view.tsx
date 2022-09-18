

import CalenderWeek from "../calender-week/calender-week";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CalenderContext } from "../../contexts/calender-context/calender-context";
import { useContext } from "react";


const CalenderView = () => {

    const {weeks} = useContext(CalenderContext);
   
    
    const months = [];
    let cm = [];
    let oldMonth = 0;
    for(var i = 0; i < weeks.length;i++)
    {
        let ddate = new Date(weeks[i].start_date);
        if(ddate.getMonth() !== oldMonth)
        {
            months.push([...cm]);
            cm = [];
            oldMonth = ddate.getMonth();
        }
        cm.push(weeks[i]);
    }
    
    return(
        <Container fluid='md' className='mt-3'>
            {months.map((month,count) => (<div key={'c'+count}><h2>{new Date(month[0].start_date).toLocaleString('default', { month: 'long', year : 'numeric' })}</h2>
            <Row  lg = {4} md={3} sm={2} xs={1}>
            {month.map((week) => {
            
            return (<Col key={'v'+week.id} className='noMargin'><CalenderWeek key={week.id} data={week} /></Col>)
            })}
          </Row></div>
          ))}
        </Container>
    )
}

export default CalenderView;