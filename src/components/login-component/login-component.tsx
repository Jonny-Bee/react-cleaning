import Container from 'react-bootstrap/Container';

import { Card } from "react-bootstrap";
import { UserContext, user_object } from '../../contexts/user-context/user-context';
import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Login } from '../../IO/DataIO';
import { useContext } from 'react';

const LoginScreen= () =>{

    const [userName, setName] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const { setUserObject } = useContext(UserContext);

    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault();
        let f = (ev:user_object) => {
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