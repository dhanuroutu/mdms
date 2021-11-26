import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import * as employeeTypeService from "../../services/EmployeeTypeService"

export default function EmployeeTypes(props) {

    const history = useHistory();
    const [employeeTypes, setEmployeeTypes] = useState([]);

    useEffect(() =>{
        employeeTypeService.getAllEmployeeTypes().then(result => {
            setEmployees(result.data);
        });  
    },[]);


    const editEmployeeType = (emp) => {

       history.push("/employeeTypes/edit", emp);
    };

    const deleteEmployee = (empTypeId) => {
        console.log("EmpTypeId : "+empTypeId+" :  is going to be deleted.");
    }


    return (
        
        <Card>
                <Card.Header>
                   <h4> Employee Types</h4>
                </Card.Header>
                <Card.Body>
        <div className="">
            <Link to="/employees/add" className="btn btn-primary float-right mb-2">Add Employee</Link>
        </div>
        <div className="">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sl No.</th>
                    <th>Employee Type</th>
                    <th>Description</th>
                   
                    </tr>
                </thead>
                <tbody className="">
                    {employees.map(empType =>{
                        return (<tr key={empType.id}>
                            <td>{empType.id}</td>
                            <td>{empType.empType}</td>
                            <td>{empType.typeDesc}</td>
                          
                            <td>
                                <button type="button" className="btn btn-success mr-2" onClick={()=>editEmployeeType(emp)}>Edit</button>
                                <button type="button" className="btn btn-danger mr-2" onClick={()=>deleteEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
        </Card.Body>
        </Card>
    );
}