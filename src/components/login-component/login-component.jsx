import Container from 'react-bootstrap/Container';

import { Card } from "react-bootstrap";
import { UserContext } from '../../contexts/user-context/user-context';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Login } from '../../IO/DataIO';
import { useContext } from 'react';
const LoginScreen= () =>{
    const [userName, setName] = useState('');
    const [pass, setPass] = useState('');
    const {user, setUserObject } = useContext(UserContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        let f = (ev) => {
            setUserObject(ev);
        }
        Login({user_name:userName,pass_word:pass},f)
      };

    return (
        <Container >
        <Card className='mt-5  '>
        <Card.Header>Login</Card.Header>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" onChange={(e) => setName(e.target.value)}/>
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
                
            </Card.Body>
        </Card>
        
        </Container>
            
        
    )
   
}
export default LoginScreen;