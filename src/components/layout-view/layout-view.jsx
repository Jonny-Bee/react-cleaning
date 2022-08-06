import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LayoutContext } from '../../contexts/layout-context/layout-context';
import { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import LayoutCard from '../layout-card/layout-card';
const LayoutView = (props) => {
    const {layouts,setGroup} = useContext(LayoutContext);

    const handleSectionChange = (event) => {
        
        setGroup(event.target.value);
      }

      
    return (
        <Container fluid className='mb-5'>
            <h2>Layout Groups</h2>

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

             <Row className='px-3' lg = {2} md={2} sm={2} xs={1}>
                    <Col lg={1} md={1}><h6>ID</h6> </Col>
                    <Col lg={9} md={9}><h6> Layout</h6> </Col>
                    
                    <Col  lg={2} md={2} className='rightAlign'><h6>Frequency</h6></Col>
                    
                </Row> 

            {layouts.map((layout,count) =>(
                <LayoutCard key={count} layout={layout} count={count}/>
            )

            )}
        </Container>
    )

}

export default LayoutView;