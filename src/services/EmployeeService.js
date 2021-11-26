import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export var getAllEmployees = () => {
    return axios.get(BASE_URL+'/employees');
}

export var addEmployee = (employee) => {
    return axios.post(BASE_URL+'/employees',employee);
}

export var updateEmployee = (employee) => {
    return axios.put(BASE_URL+'/employees/'+employee.id,employee);
}

export var deleteEmployee = (empId,isActive) => {
    
    return axios.delete(BASE_URL+'/employees/'+empId+'?active='+isActive);
}
