import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav-bar.styles.css';



const TopNav = (props) =>{

    

    return (
        <Navbar sticky='top'  expand="lg" variant='dark' className=' p-3 deep-green'>
          <Container fluid>
          
            <Navbar.Brand href='/'> 725 Cleaning Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="ms-auto">
              <Nav.Link href="../schedule/">Cleaning Schedule</Nav.Link>
              <Nav.Link href="../weekly/">Weekly Sheet</Nav.Link>
              <NavDropdown className='mr-2'title="Cleaning Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="../locations/">Location Management</NavDropdown.Item>
              <NavDropdown.Item href="../layouts/">Layout Management</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="../calender/">Calender Management</NavDropdown.Item>
            </NavDropdown>
              </Nav>
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default TopNav;