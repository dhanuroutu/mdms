import React, {useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
}
 
function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }
    

  return(
    <div className="align-middle">
      <div className="login-wrapper">
          <Container>
          <h1> Login</h1>
          <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Col  className="col-sm-2">
                <Form.Label>Username</Form.Label>
            </Col>
            <Col  className="col-sm-6">
                <Form.Control type="text" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="col-sm-2">
                <Form.Label>Password</Form.Label>
            </Col>
            <Col  className="col-sm-6">
                <Form.Control type="password"  placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
            </Col>
          </Form.Group>
              
                <div className="text-center">
                    <Button type="submit" variant="primary" className="btn btn-sm-4">Login</Button>
                </div>
          </Form>
          </Container>

          </div>
    </div>
    
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;