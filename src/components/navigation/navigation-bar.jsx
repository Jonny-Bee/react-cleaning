import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav-bar.styles.css';
import { UserContext } from '../../contexts/user-context/user-context';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Stack } from 'react-bootstrap';


const TopNav = (props) =>{

    
  const {user} = useContext(UserContext);
  const loggedOut = user.hash !== undefined ? false : true;

    return (
        <Navbar sticky='top'  expand="md" variant='dark' className='bg-success'>
          
          <Container fluid className='p-3'>
          
            <Navbar.Brand as={NavLink} to='/'>
            <i className="fa-solid fa-thumbs-up mr-1"></i> Store Cleaning </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="ms-auto ">
              <NavDropdown  disabled={loggedOut} title="Cleaning Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/locations/">Location Management</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/layouts/">Layout Management</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} disabled={loggedOut} to="/calender/">Calender Management</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} disabled={loggedOut} to="/schedule/">Cleaning Schedule</Nav.Link>
              <Nav.Link as={NavLink} disabled={loggedOut} to="/weekly/">Weekly Sheet</Nav.Link>
              
              </Nav>
             
            </Navbar.Collapse>
            
          </Container>
          
         
        </Navbar>
      );
}

export default TopNav;