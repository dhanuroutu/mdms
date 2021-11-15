import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

function TopMenu(props) {

    const user = <FontAwesomeIcon icon={faUser} /> ;
    const username = "dhanuroutu";
    const title = props.title;
    let history = useHistory();

    function logOut(){
        localStorage.clear();
        //console.log("history::::", history);
        history.push("/login");
    }

    return (
        <Navbar bg="primary gradient" expand="lg">
            <Navbar.Brand href="#home"><h2  className="title">Daily Labour</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Item>{<h3>{title}</h3>}</Nav.Item>
                </Nav>
                {localStorage.getItem("token") ?
                    <Nav className="mx-2">
                        <NavDropdown title={
                            <b>{username} {user}</b>  
                        }>
                        <NavDropdown.Item href="/login" onClick={logOut}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></NavDropdown.Item>
                        </NavDropdown>   
                    </Nav>
                : null
                }
            </Navbar.Collapse>
        </Navbar> 
        
    );
}

export default TopMenu;