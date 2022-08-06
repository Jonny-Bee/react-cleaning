import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './nav-bar.styles.css';



const TopNav = (props) =>{

    

    return (
        <Navbar sticky='top'  expand="lg" variant='dark' className=' p-3 deep-red'>
          <Container>
          
            <Navbar.Brand href='/'> 725 Cleaning Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="../schedule/">Cleaning Schedule</Nav.Link>
              <Nav.Link href="../locations/">Location Management</Nav.Link>
              <Nav.Link href="../layouts/">Layout Management</Nav.Link>
              <Nav.Link href="../calender/">Calender Management</Nav.Link>
                
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default TopNav;