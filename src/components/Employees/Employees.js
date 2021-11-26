import { useEffect, useState } from "react";
import { Button, Card, Form, Table, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { isElementOfType } from "react-dom/test-utils";
import { Link , useHistory} from "react-router-dom";
import * as employeeService from "../../services/EmployeeService"
import ItemPagination from "./ItemPagination";

export default function Employees(props) {

    const history = useHistory();
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);

    const [activePage, setActivePage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [pages, setPages] = useState(1);


    useEffect(() =>{
        getAllEmployees();
    },[]);

    const getAllEmployees = () => {
        employeeService.getAllEmployees().then(result => {
            setEmployees(result.data);
            console.log('result ::::',result.data);
            let recordsCount = result.data.length;
            let pageCount = (recordsCount === 0) ? 1 : Math.floor( recordsCount/recordsPerPage) + 1;
            setPages(pageCount);
            setRecords(result.data.length< recordsPerPage ? result.data : result.data.slice(0, recordsPerPage));
        });  
    }

    const editEmployee = (emp) => {

       history.push("/employees/edit", emp);
    };

    const deleteEmployee = (empId,isActive) => {
        isActive = (!isActive)?'true':'false';
        employeeService.deleteEmployee(empId,isActive);
        getAllEmployees();
    
    }

    const onPagePerRecordsChange = (noOfRecords) => {
        setRecordsPerPage(noOfRecords);
        let recordsCount = employees.length;
        let pageCount = (recordsCount === 0) ? 1 : Math.floor( recordsCount/noOfRecords) + 1;
        setPages(pageCount);
        setRecords(employees.slice(noOfRecords*(activePage-1), noOfRecords*activePage));

    }

    const onPageChange = (currentPage) => {
        setActivePage(currentPage);
        setRecords(employees.slice(recordsPerPage*(currentPage-1), recordsPerPage*currentPage));

    }

    return (
        
        <Card>
                <Card.Header>
                   <h4> Employees</h4>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                    <div className="col-6">
                    <Form.Control  type="text"   placeholder="Search" aria-describedby="inputGroupPrepend"/>
                    </div>
                    <div className="col-2">
                    <Button type="button">Search</Button>
                    </div>
                    <div className="col-4">
                        <Link to="/employees/add" className="btn btn-primary mb-2 float-right">Add Employee</Link>
                    </div>
                    </div>
        <div className="">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Employee Type</th>
                    <th>Address</th>
                    <th>Active</th>
                    <th>Actions</th>
                    
                    </tr>
                </thead>
                <tbody className="">
                    {records.map(emp =>{
                     
                        return (<tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.employeeType}</td>
                            <td>{emp.address}</td>
                            <td>{emp.isActive?'true':'false'}</td>

                            <td>
                                <button type="button" className="btn btn-success mr-2" onClick={()=>editEmployee(emp)}>Edit</button>
                                {/* <ToggleButton type="radio" value={emp.isActive} className="btn btn-danger mr-2" onClick={()=>deleteEmployee(emp.id)} >Activate</ToggleButton> */}
                                <ToggleButtonGroup id="buttongroup" name="buttongroup" defaultValue={[1]}>
                                    <ToggleButton id="battle"  size="lg" type="radio" className="pt-1 pb-1" variant={emp.isActive?"danger":"success"} onClick={()=>deleteEmployee(emp.id,emp.isActive)}>
                                        {emp.isActive ? "Disable":"Enable"}
                                    </ToggleButton>
                                    {/* <ToggleButton id="acti" value={emp.isActive} size="lg" type="radio" className="pt-3 pb-3" variant={emp.isActive?"danger":"success"} onClick={()=>deleteEmployee(emp.id,emp.isActive)}></ToggleButton> */}
                                </ToggleButtonGroup>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            <ItemPagination pages={pages} active={activePage} noOfRecords={recordsPerPage}
             onPageChange={onPageChange} onPagePerRecordsChange={onPagePerRecordsChange}/>
        </div>
        </Card.Body>
        </Card>
    );
}