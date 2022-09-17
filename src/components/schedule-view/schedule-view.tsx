import Container from 'react-bootstrap/Container';
import { LocationContext } from '../../contexts/location-context/location-context';
import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { iFramePrinter } from '../../utils/print-helper';
import { LayoutContext } from '../../contexts/layout-context/layout-context';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CalenderContext } from "../../contexts/calender-context/calender-context";
import ScheduleRow from './schedule-row';


const SheduleView = () =>{
    const {locations,setSection,section} = useContext(LocationContext);
    const {setGroup} = useContext(LayoutContext);
    const {weeks} = useContext(CalenderContext);
    const [tableWeeks,setTableWeeks] = useState<Date[]>([]);
    
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

    const handlePrint = ()=>{
        iFramePrinter('printable');
    }

    const setWeeks = (date:string) => {
         let startDate;
         if(date)
            startDate = new Date(date);
         else
            startDate = new Date(weeks[0].start_date);
        startDate.setDate(startDate.getDate()  - startDate.getDay());
         let tempWeeks:Date[] = [];
         for(var i = 0; i < 13; i++)
         {
            let nextDate = new Date(startDate);
            nextDate.setDate(nextDate.getDate() + i * 7);
            tempWeeks.push(nextDate);
         }
         setTableWeeks(tempWeeks);
    }

    const handleSectionChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value === '') return;
        setSection(event.target.value);
        setGroup(event.target.value);
    }
    const handleDateChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
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
                   
                    <Form.Select size='sm' aria-label="Section" onChange={handleSectionChange} value={section}>
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
                            return <option key={myDate.toLocaleDateString()+week.id+'_'+count} value={week.id}>{myDate.toLocaleDateString()}</option>
                        })
                        }
                    </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={2} >
                <Button size='sm' className=''variant="info" disabled={getDisabled()} onClick={handlePrint}><i className="fa-solid fa-print"></i> Print Sheets </Button>
                </Col>
                </Row>
            </Container>
            
            <Container fluid className='mb-5 ' id='printable'>
                {splitLocations.map((_locations,count) =>(
                    <>
                    <h6 className='page_break p_title' key={count+'_title'}>{section} cleaning Page {count+1} of {splitLocations.length}</h6>
            <table cellPadding="0" cellSpacing="0"  key={count+'_table'} >
                <thead key={count+'_head'}>
                    <tr className='p_heading'  key={count+'_trow'}>
                    <th key={count+'_layout'}>Layout</th>
                    <th key={count+'_bay'}>Bay</th>
                    {tableWeeks.map((week,count2) =>( <td key={count+'_date_'+count2}className='p_center p_date'>{week.toLocaleDateString()}</td>))}
                </tr></thead><tbody>
            
            {_locations.map((location,count2) =>(
                <ScheduleRow key={location.group_name + '_row_' + location.bay} location={location} count={count2} weeks={tableWeeks} promo={weeks}/>
            )

            )}
            </tbody>
            </table>
            <div key={'foot_' + count}className='foot'>WAHS 2526 (01/22)</div>
            </>
            ))}
            
        </Container>
        </>
    )
}
export default SheduleView;