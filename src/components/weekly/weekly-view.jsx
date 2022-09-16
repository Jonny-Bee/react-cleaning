import Container from 'react-bootstrap/Container';
import { LocationContext } from '../../contexts/location-context/location-context';
import { CalenderContext } from '../../contexts/calender-context/calender-context';
import { useContext, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { iFramePrinter } from '../../utils/print-helper';
import WeeklyRow from './weekly-row';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WeeklyView = (props) => {

    const {store} = useContext(LocationContext);
    const {weeks} = useContext(CalenderContext);
    const [selectedWeek,selectWeek] = useState(new Date(weeks[0].start_date))
    const [cleaningList, setCleaningList] = useState([]);
    const [showOverDue, setOverDue] = useState(true);
    
    
    useEffect(() =>  {
        let _cleaningList = [];
        let thisWeek = selectedWeek;
        for(var i = 0; i < store.length; i ++)
        {
            let lastDate = new Date(store[i].last_clean);
            let nextDate = new Date( store[i].last_clean);
            nextDate.setDate(nextDate.getDate() + store[i].frequency * 7);
            nextDate.setDate(nextDate.getDate()  - nextDate.getDay());
            if(nextDate.toLocaleDateString() === thisWeek.toLocaleDateString())
            {
                _cleaningList.push({location:store[i],isOverDue:false});
            }
            else if(nextDate < thisWeek)
            {
                _cleaningList.push({location:store[i],isOverDue:true});
            }
            else{
                console.log(nextDate.toLocaleDateString() +' -- '+ thisWeek.toLocaleDateString());
            }
        }
        setCleaningList(_cleaningList);
        console.log(_cleaningList.length + ' ' + selectedWeek.toLocaleDateString())
    },[selectedWeek]);

    const handlePrint = (e)=>{
        iFramePrinter('printable',true);
    }

    const handleDateChange = (event) => {
        if(event.target.value === '') return;
        let sDate = '';
        
        for(var i =0;i<weeks.length;i++)
        {
            if(weeks[i].id === parseInt(event.target.value))
                sDate = new Date(weeks[i].start_date);
        }
        selectWeek(sDate);
    }

   

    const handleOverDueChange = (event) =>{

    }
    const getHeading = () =>{
        if(selectedWeek)
            return selectedWeek.toLocaleDateString()
        else
            return '-';
    }
    const getDisabled = () =>{
        return cleaningList.length > 0 ? false : true;
   }
    return (
        <>
        <Container fluid className='mb-5 mt-4'>
            
            <Row>
                <Col sm={9}>
                    <Form.Group className="mb-3">
                        
                        <Form.Select size='sm' aria-label="Section" onChange={handleDateChange}>
                            <option  value=''>Select Week</option>
                            {
                                weeks.map((week,count) => {
                                let myDate = new Date(week.start_date);
                                return <option key={'o'+ count} value={week.id}>{myDate.toLocaleDateString()}</option>
                            })
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="info" size='sm' onClick={handlePrint} disabled={getDisabled()}><i className="fa-solid fa-print"></i> Print Sheet </Button>
                </Col>
             </Row>
        </Container>

        <Container fluid className='mb-5' id='printable'>
        <h4 className='p_title'>Cleaning Week - {getHeading()}</h4>
            <table cellPadding="0" cellSpacing="0" className='p_row_interactive'>
                <thead>
                <tr className='p_heading' height='30px'>
                    <th width='35%'>Layout</th>
                    <th width='8%'>Bay</th>
                    <th width='12%'>Last Cleaned</th>
                    <th width = '10%'>Date</th>
                    <th width = '35%'>Sign</th>
                </tr>
                </thead>
                <tbody>
            {cleaningList.map((ob,count) =>(
                <WeeklyRow key={count} location={ob.location} count={count}/>
            )

            )}
            </tbody>
            </table>  
        </Container>

        

       

        </>
    )

}

export default WeeklyView;