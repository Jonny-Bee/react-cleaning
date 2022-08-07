import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap";

const Home= () =>{

    return (
        <Container >
        <Card className='mt-5'>
        <Card.Header>Whats New?</Card.Header>
            <Card.Body>
                <Card.Title>New Cleaning Admin App</Card.Title>
                <Card.Text>
                    Designed to simplify the tracking and planning of the stores cleaning requirements.
                </Card.Text>
                
            </Card.Body>
        </Card>
        <Row>
            <Col>
            <Card className='mt-5'>
                <Card.Header>Features</Card.Header>
                <Card.Body>
                        <Card.Title>Automatic Scheduling</Card.Title>
                        <Card.Text>
                            Automatically plans future cleaning based on previous cleaning activity.
                        </Card.Text>
                        
                </Card.Body>
        </Card>
            </Col>
            <Col>
            <Card className='mt-5'>
                <Card.Header>Features</Card.Header>
                <Card.Body>
                        <Card.Title>Tracking and reporting</Card.Title>
                        <Card.Text>
                            Tracks outstanding and overdue planned cleaning activities.
                        </Card.Text>
                        
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className='mt-5'>
                <Card.Header>Features</Card.Header>
                <Card.Body>
                        <Card.Title>Print legal documentation</Card.Title>
                        <Card.Text>
                            Creates printable WAHS documents for signing and archiving.
                        </Card.Text>
                        
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
            
        
    )
}
export default Home;