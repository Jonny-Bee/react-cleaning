import Container from 'react-bootstrap/Container';
import { LocationContext } from '../../contexts/location-context/location-context';
import { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import LocationCard from '../location-card/location-card';
import Button from 'react-bootstrap/esm/Button';
import { iFramePrinter } from '../../utils/print-helper';
import Modal from 'react-bootstrap/Modal';
import { LayoutContext } from '../../contexts/layout-context/layout-context';
import { UserContext } from '../../contexts/user-context/user-context';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
const LocationView= (props) => {
    const {locations,setSection, addLocation} = useContext(LocationContext);
    const {layouts,setGroup} = useContext(LayoutContext);

    const handleSectionChange = (event) => {
        
        setSection(event.target.value);
        setGroup(event.target.value);
    }

    const handlePrint = (e)=>{
        iFramePrinter('printable');
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () =>{
        let selectedLayout = document.getElementById("layoutSelect").value;
        let selectedDate = document.getElementById("dateSelect").value;
        let formattedDate = new Date(selectedDate).toISOString().slice(0, 19).replace('T', ' ');
        console.log({layout_id:selectedLayout,date:formattedDate});
        addLocation({layout_id:selectedLayout,date:formattedDate});
    }
    const {user} = useContext(UserContext);
    if(user.hash === undefined)
        return(<Redirect to='/'/>)
    return (
        <>
        <Container fluid className='mb-5'>
            <h2>Locations</h2>

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
        </Container>

        <Container fluid className='mb-5' id='printable'>
            <table cellPadding="0" cellSpacing="0" className='p_row_interactive'>
                <thead>
                <tr className='p_heading' height='30px'>
                    <th>Layout</th>
                    <th>Bay</th>
                    <th>Last Cleaned</th>
                    <th>Next Clean</th>
                </tr>
                </thead>
                <tbody>
            {locations.map((location,count) =>(
                <LocationCard key={count} location={location} count={count}/>
            )

            )}
            </tbody>
            </table>
            
        </Container>

        <Container fluid>
            <Button hidden variant="primary" onClick={handlePrint}> print </Button>
            <Button size = 'sm' variant="danger" onClick={handleShow}> Add Locations</Button>
        </Container>

        <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Cleaning Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mb-3" controlId="layoutSelect">
            <Form.Label>Select Layout Group</Form.Label>
            <Form.Select  >
                {layouts.map((layout)=>(<option key={layout.id} value={layout.id}>{layout.id} - {layout.group_name}</option>))}
                
            </Form.Select>
        </Form.Group>
                <Form.Group  controlId="dateSelect">
                    <Form.Label>Last Cleaned Date (optional)</Form.Label>
                    <Form.Control  type="date" name="lc" placeholder="Last Cleaned" defaultValue='2021-01-01'/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" onClick={handleSave}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>

        </>
    )

}

export default LocationView;