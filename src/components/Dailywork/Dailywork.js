import React, {useState, useEffect } from 'react';
import './Dailywork.css';
import * as service from '../../services/DailyworkService'
import {Col, Form, Row, Table } from 'react-bootstrap';
import Moment from 'moment';


export default function Dailywork(props) {

    const [employees, setEmployees] = useState([]);
    const [dailyWorkList, setDailyWorkList] = useState([]);
    const [values, setValues] = useState({});
    const [date, setDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
    
    let units;

  useEffect(() => {
    getAllDailyWorks();
    // console.log('values ---------------- ',values);

  },[date]);

  const getAllDailyWorks = () => {
    service.getAllLabours(1).then((result) => {
        setEmployees((prev)=>result.data);
        // console.log('labour result :::: ',result.data);
        // console.log(':::: values in getAllDailyWorks::::: ', values);
    });

    service.getDailyworkByDate(Moment(date).format('DD-MM-YYYY')).then((result) => {
        setDailyWorkList((prev)=>result.data);
    });
  }

  const isDailyworkAvailable = (empId) => {

    // const empValues = values[empId];
    // if (empValues == undefined || empValues?.mode === 'add') {
    //     return 0;
    // } else {
    //     return empValues.value;
    // }

    let numOfUnits = 0;
    for(let i=0;i<dailyWorkList.length;i++){
        if(dailyWorkList[i].employeeId === empId){
            numOfUnits = dailyWorkList[i].numOfUnits;
            break;
        }
    }
    //console.log("Kgs:::"+kgs);
    return numOfUnits;
     
  }

  const handleChanges = (e) => {
    const {name, value} = e.target;
    setDate(value);
  };

  const handleUnits = (e, empId) => {
    const {name, value} = e.target;
    setValues(prev => {return {...prev, [empId]:{value:value, mode:'add'} }});
    // console.log(':::: values ::::: ', values);
  };
    

  const handleSubmit = (empId) => {
    let obj = {employeeId:empId, numOfUnits:values[empId].value, date: new Date(date)};
    // console.log(obj);
    service.addDailywork(obj).then(result => {
        // console.log(result);
        let employee = values[empId];
        employee.mode = "edit";
        setValues(prev => {return {...prev, [empId]:employee }});
        getAllDailyWorks();
    });
 }

 const updateDailywork = (empId) => {
    let obj = {employeeId:empId, numOfUnits:values[empId].value, date: new Date(date)};
    let id;
    for(let i=0;i<dailyWorkList.length;i++){
        if(dailyWorkList[i].employeeId === empId){
            id = dailyWorkList[i].employeeId;
            break;
        }
    }
    obj["id"]=id;
    service.addDailywork(obj).then(result => {
        // console.log(result);
    });
 }

 const [enabledId, setEnabledId] = useState();
 const [disableValues, setDisableValues] = useState({});

  const handleClick = (empId) => {
      console.log('handleClick ::: ',empId);
    setEnabledId(empId)
  };

  const isDisabled = (empId) =>  {
      //mode -> edit , 
      
      const empValues = values[empId];
      if (empValues === undefined) {
        for(let i=0;i<dailyWorkList.length;i++){
            if(dailyWorkList[i].employeeId === empId){
                const numOfUnits = dailyWorkList[i].numOfUnits;
                
                return numOfUnits > 0;
            }
        }
      }
      if(empValues?.mode === 'edit' &&  enabledId !== empId) {
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
                    { employees.map(employee =>{
                        return (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                { 
                                  isDailyworkAvailable(employee.id) > 0 ? 
                                 (<>
                                    <td>
                                        <div onDoubleClick={(e) => handleClick(employee.id)}>
                                        <input type="text" name="noOfKgs" value={isDailyworkAvailable(employee.id)} onChange={(e) => handleUnits(e, employee.id)}   disabled={isDisabled(employee.id)} ></input>
                                        </div>
                                        </td>
                                    <td><button type="button" className="btn btn-success" onClick={e => updateDailywork(employee.id)} disabled={isDisabled(employee.id)} >Update</button></td>
                                 </>) : 
                                 (<>
                                    <td><input type="text" name="noOfKgs" value={(values[employee.id]?.value === undefined) ? "": values[employee.id].value} onChange={(e) => handleUnits(e, employee.id)}></input></td>
                                    <td><button type="button" className="btn btn-success" onClick={e => handleSubmit(employee.id)}>Add</button></td>
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