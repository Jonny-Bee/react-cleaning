import Container from 'react-bootstrap/Container';
import { LocationContext } from '../../contexts/location-context/location-context';
import { useContext, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { iFramePrinter } from '../../utils/print-helper';
import { LayoutContext } from '../../contexts/layout-context/layout-context';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CalenderContext } from "../../contexts/calender-context/calender-context";
import ScheduleRow from './schedule-row';


const SheduleView = (props) =>{
    const {locations,setSection,section} = useContext(LocationContext);
    const {layouts,setGroup} = useContext(LayoutContext);
    const {weeks} = useContext(CalenderContext);
    const [tableWeeks,setTableWeeks] = useState([]);
    
    const splitLocations = [];
    let tLoc = [];
    let c = 0;
    
    for(var i = 0 ; i < locations.length;i++)
    {
        tLoc.push(locations[i]);
        c++;
        if(c === 10 || i === locations.length -1)
        {
            c = 0;
            splitLocations.push([...tLoc]);
            tLoc = [];
        }
        
    }
    const handlePrint = (e)=>{
        iFramePrinter('printable');
    }
    const setWeeks = (date) => {
         let startDate;
         if(date)
            startDate = new Date(date);
         else
            startDate = new Date(weeks[0].start_date);
        startDate.setDate(startDate.getDate()  - startDate.getDay());
         let tempWeeks = [];
         for(var i = 0; i < 13; i++)
         {
            let nextDate = new Date(startDate);
            nextDate.setDate(nextDate.getDate() + i * 7);
            tempWeeks.push(nextDate);
         }
         setTableWeeks(tempWeeks);
    }

    const handleSectionChange = (event) => {
        if(event.target.value === '') return;
        setSection(event.target.value);
        setGroup(event.target.value);
    }
    const handleDateChange = (event) => {
        if(event.target.value === '') return;
        let sDate = '';
        
        for(var i =0;i<weeks.length;i++)
        {
            if(weeks[i].id === parseInt(event.target.value))
                sDate = weeks[i].start_date;
        }
        setWeeks(sDate);
    }
   const getDisabled = () =>{
        return tableWeeks.length > 0 ? false : true;
   }
    return(
        <>
            <Container fluid className='mb-5 mt-3'>
                <h5>Cleaning Schedule</h5>
                <Row>
                <Col>
                 <Form.Group className="mb-3">
                   
                    <Form.Select size='sm' aria-label="Section" onChange={handleSectionChange}>
                        <option value='Ambient'>Ambient</option>
                        <option value='Chilled'>Chilled</option>
                        <option value='Frozen'>Frozen</option>
                        <option value='BWS'>BWS</option>
                        <option value='BreadandCakes'>Bread and Cakes</option>
                        <option value='FRV'>Fruit and Veg</option> 
                    </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                 <Form.Group className="mb-3">
                 
                    <Form.Select size='sm' aria-label="Section" onChange={handleDateChange}>
                        <option  value=''>Select Start Date...</option>
                        {
                            weeks.map((week,count) => {
                            let myDate = new Date(week.start_date);
                            return <option key={'o'+ count} value={week.id}>{myDate.toLocaleDateString()}</option>
                        })
                        }
                    </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={2} >
                <Button size='sm' className=''variant="danger" disabled={getDisabled()} onClick={handlePrint}> Print Sheets </Button>
                </Col>
                </Row>
            </Container>
            
            <Container fluid className='mb-5 ' id='printable'>
                {splitLocations.map((_locations,count) =>(
                    <>
                    <h6 className='page_break p_title'>{section} cleaning Page {count+1} of {splitLocations.length}</h6>
            <table cellPadding="0" cellSpacing="0" >
                <thead><tr className='p_heading' height='30px'>
                    <th>Layout</th>
                    <th>Bay</th>
                    {tableWeeks.map((week,count) =>( <td key={count}className='p_center'>{week.toLocaleDateString()}</td>))}
                </tr></thead><tbody>
            
            {_locations.map((location,count) =>(
                <ScheduleRow key={count} location={location} count={count} weeks={tableWeeks} promo={weeks}/>
            )

            )}
            </tbody>
            </table>
            <div className='foot'>WAHS 2526 (01/22)</div>
            </>
            ))}
            
        </Container>
        </>
    )
}
export default SheduleView;