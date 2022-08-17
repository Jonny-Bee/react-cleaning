import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav-bar.styles.css';
import { UserContext } from '../../contexts/user-context/user-context';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'


const TopNav = (props) =>{

    
  const {user} = useContext(UserContext);
  const loggedOut = user.hash !== undefined ? false : true;

    return (
        <Navbar sticky='top'  expand="lg" variant='dark' className=' p-3 deep-green'>
          <Container fluid>
          
            <Navbar.Brand to='/'> 725 Cleaning Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="ms-auto ">
              <Nav.Link as={NavLink} hidden={loggedOut} to="/schedule/"><Link></Link>Cleaning Schedule</Nav.Link>
              <Nav.Link as={NavLink} hidden={loggedOut} to="/weekly/">Weekly Sheet</Nav.Link>
              <NavDropdown  className='mr-2' title="Cleaning Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/locations/">Location Management</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/layouts/">Layout Management</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/calender/">Calender Management</NavDropdown.Item>
            </NavDropdown>
              </Nav>
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default TopNav;