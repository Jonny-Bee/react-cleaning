import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav-bar.styles.css';
import { UserContext } from '../../contexts/user-context/user-context';
import { useContext } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
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
                <LinkContainer to="/schedule/"><NavItem hidden={loggedOut} >Cleaning Schedule</NavItem></LinkContainer>
              
                <LinkContainer to="/weekly/"><NavItem hidden={loggedOut} >Weekly Sheet</NavItem></LinkContainer>
                
              <NavDropdown className='mr-2' title="Cleaning Admin" id="basic-nav-dropdown">
              <LinkContainer to="/locations/"><NavDropdown.Item disabled={loggedOut} >Location Management</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/layouts/"><NavDropdown.Item disabled={loggedOut} >Layout Management</NavDropdown.Item></LinkContainer>
              
              <NavDropdown.Divider />
              <LinkContainer to="/calender/"> <NavDropdown.Item disabled={loggedOut} >Calender Management</NavDropdown.Item></LinkContainer>
            </NavDropdown>
              </Nav>
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default TopNav;