import React, {useState, useEffect } from 'react';
import './Dailywork.css';
import * as service from '../../services/DailyworkService'
import {Col, Form, Row, Table } from 'react-bootstrap';
import Moment from 'moment';


export default function Dailywork(props) {

    const [values, setValues] = useState([]);
    const [date, setDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
    
    const [enabledId, setEnabledId] = useState();
    const [disableValues, setDisableValues] = useState({});

    let units;

  useEffect(() => {
    getAllDailyWorks();
  },[date]);

  const getAllDailyWorks = () => {
    service.getAllLabours(1).then((result) => {
        let employees = result.data;

        service.getDailyworkByDate(Moment(date).format('DD-MM-YYYY')).then((result1) => {
            let dailyWages = result1.data;
            let dailyWageValues = [];
            for(let i=0;i<employees.length;i++){
                let isMatched = false;
               
                for(let j=0;j< dailyWages.length;j++){
                    if(dailyWages[j].employeeId === employees[i].id){
                        let obj = {
                            wageId: dailyWages[j].wageId,
                            employeeId: employees[i].id,
                            numOfUnits: dailyWages[j].numOfUnits,
                            date: new Date(date),
                            name: employees[i].name,
                            mode: "edit"
                        };
                        dailyWageValues.push(obj);
                        isMatched = true;
                        break;
                    }
                }
                if(!isMatched){
                    let obj = {
                        employeeId:employees[i].id,
                        numOfUnits: 0,
                        date: new Date(date),
                        name: employees[i].name,
                        mode: "add"
                    };
                    dailyWageValues.push(obj);
                }
            }

            setValues(dailyWageValues);
        });
    });
  }

  const handleChanges = (e) => {
    const {name, value} = e.target;
    setDate(value);
  };

  const handleUnits = (e, empId) => {
    const {name, value} = e.target;
    console.log("Value::::", value);
    setValues ( (prevDailyWages) => {
        for(let i = 0; i < prevDailyWages.length; i++) {
            if(prevDailyWages[i].employeeId === empId){
                prevDailyWages[i].numOfUnits = value;
                prevDailyWages[i].mode = 'edit';
                break;
            }
        }
        return [...prevDailyWages];
    });
    
    console.log('values:::', values);
  };
    

  const handleSubmit = (emp) => {
    let obj = {employeeId:emp.employeeId, numOfUnits:emp.numOfUnits, date: emp.date};
    // console.log(obj);
    service.addDailywork(obj).then(result => {
        getAllDailyWorks();
    });
 }

 const updateDailywork = (emp) => {
    let obj = {wageId: emp.wageId, employeeId:emp.employeeId, numOfUnits:emp.numOfUnits, date: emp.date};
    service.updateDailywork(obj).then(result => {
        setEnabledId(0);
    });
 }

  const handleClick = (empId) => {
    console.log('handleClick ::: ',empId);
    setEnabledId(empId);
  };

  const isDisabled = (emp) =>  {
            
      if(emp?.mode === 'edit' &&  enabledId !== emp.employeeId) {
          return true;
      } 
      return false;
  }

  return(
    <>
        <div className="form-container">
        <div className="mt-2">
            <Form>
                <Form.Group controlId="date" as={Row}>
                    <Form.Label column sm="2">Date</Form.Label>
                    <Col sm="2">
                    <Form.Control type="date" name="date" value={date} onChange={handleChanges} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>No. of Kgs</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { values.map(employee =>{
                        return (
                            <tr key={employee.employeeId}>
                                <td>{employee.name}</td>
                                { 
                                  (employee.numOfUnits) > 0 ? 
                                 (<>
                                    <td>
                                        <div onDoubleClick={(e) => handleClick(employee.employeeId)}>
                                        <input type="text" name="numOfUnits" value={employee.numOfUnits} 
                                        onChange={(e) => handleUnits(e, employee.employeeId)}   
                                        disabled={isDisabled(employee)} ></input>
                                        </div>
                                        </td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={e => updateDailywork(employee)} 
                                    disabled={isDisabled(employee)} >Update</button>
                                    </td>
                                 </>) : 
                                 (<>
                                    <td>
                                        <input type="text" name="numOfUnits" value={employee.numOfUnits === 0 ? "": employee.numOfUnits} 
                                    onChange={(e) => handleUnits(e, employee.employeeId)}></input>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={e => handleSubmit(employee)}>Add</button>
                                    </td>
                                 </>)
                            }                               
                            </tr>
                        );
                    })}
                
                </tbody>
            </Table>
        </div>
    </div>
    </>
  );
}