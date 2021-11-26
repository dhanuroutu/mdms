import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export var getAllEmployeeTypes = () => {
    return axios.get(BASE_URL+'/employeeTypes');
}

export var addEmployeeType = (employeeType) => {
    return axios.post(BASE_URL+'/employeeTypes',employeeType);
}

export var updateEmployeeType = (employeeType) => {
    return axios.put(BASE_URL+'/employeeTypes/'+employeeType.id,employeeType);
}

export var deleteEmployeeType = (empTypeId) => {
    return axios.delete(BASE_URL+'/employeeTypes/'+empTypeId);
}
