import { Card } from "react-bootstrap";
import { useContext, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateLayout } from "../../IO/DataIO";
import { LayoutContext } from "../../contexts/layout-context/layout-context";
import Form from 'react-bootstrap/Form';
const LayoutCard = (props) => {

    const bgClass = props.count % 2 === 0 ? 'grey' : '';
    const [show, setShow] = useState(false);
    const {cUpdateLayout } = useContext(LayoutContext);
    const tLayout = {...props.layout};
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const weeks = [4,6,8,16,26,52];

    const handleChange = (event)  =>{
        tLayout.frequency = event.target.value;
    }
    const handleSave= (event)  =>{
        updateLayout({id:tLayout.id,field:'frequency',value:tLayout.frequency})
        cUpdateLayout(tLayout);
    }
        return(
            <>
            <Card className='highlight' onClick={handleShow}>
                
                <Card.Body className = {bgClass}>
                <Row  lg = {3} md={3} sm={3} xs={1}>
                    <Col lg={1} md={1}>{props.layout.id} </Col>
                    <Col lg={9} md={9}>{props.layout.group_name.toUpperCase()}</Col>
                    <Col lg={2} md={2} className='rightAlign'>{props.layout.frequency} Weeks</Col>
                    
                </Row> 
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Layout Frequency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Select size='sm' aria-label="Section" onChange={handleChange}>
                    {
                        weeks.map((week) => (<option value={week}>{week} weeks</option>))
                    }
                </Form.Select>
             </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </>
        )
}

export default LayoutCard;