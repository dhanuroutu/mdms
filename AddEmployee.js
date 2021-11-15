import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {  useHistory, useLocation } from "react-router-dom";
import * as employeeService from '../../services/EmployeeService';

const AddEmployee = (props) => {

    const history = useHistory();
    const location = useLocation();


    const [employee, setEmployee] = useState({id: null, name: '',gender: '',
         address: '', contactNumber: '', govtId: '', govtIdProofType: '', age: '', employeeType: ''});

    const changeEmployee = (e) => {
        const name =  e.target.name, val = e.target.value;
        //console.log(name,val);
        setEmployee(old => {
            old[name]=val;
            return {...old}
        });
    }

    useEffect(() => {
        console.log("Emp:::",location.state);
        if(location.state){
            setEmployee(location.state);
        }
    },[location])

    const addEmployee = (e) => {
        employeeService.addEmployee(employee).then((result) => {
            console.log(result.data);
            if(result.data){
                history.push("/employees");
            }
        });
    }

    const updateEmployee = (e) => {
        employeeService.updateEmployee(employee).then((result) => {
            console.log(result.data);
            if(result.data){
                history.push("/employees");
            }
        });
    }

    const goToBack = (e) => {
        history.push("/employees");
    }

    return (
        <div className="">
            <Card>
                <Card.Header>
                    {(location.state)? <h4>Edit Employee</h4> : <h4>Add Employee</h4>}
                </Card.Header>
                <Card.Body>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Name</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="name" value={employee.name} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Age</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="age" value={employee.age} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Gender</Form.Label>
                    <Col sm="4">
                        <Form.Check type="radio" name="gender" value="Male" onChange={changeEmployee} label={'Male'} inline checked={employee.gender === 'Male'}></Form.Check>
                        <Form.Check type="radio" name="gender" value="Female" onChange={changeEmployee} label={'Female'} inline checked={employee.gender === 'Female'}></Form.Check>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Employee Type</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="employeeType" value={employee.employeeType} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Contact</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="contactNumber" value={employee.contactNumber} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Address</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="address" value={employee.address} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Govt. Id Proof Type</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="govtIdProofType" value={employee.govtIdProofType} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label  column sm="2">Govt. Id Proof</Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" name="govtId" value={employee.govtId} onChange={changeEmployee}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Col sm="4">
                    {
                        (location.state)?  <Button className="mr-2" onClick={updateEmployee}>Update Employee</Button> : 
                        <Button className="mr-2" onClick={addEmployee}>Add Employee</Button> 
                    }

                    <Button className="mr-2" onClick={goToBack}>Back</Button> 

                       
                    </Col>
                </Form.Group>
            </Form>
            </Card.Body>
            </Card>
        </div>
    );
}

export default AddEmployee;
