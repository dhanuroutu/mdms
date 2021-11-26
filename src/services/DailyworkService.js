import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export var getAllLabours = (employeeType) => {
    return axios.get(BASE_URL+'api/employees/type/'+employeeType);
}

export var addDailywork = (dailyWages) => {
    return axios.post(BASE_URL+'api/dailyWages',dailyWages);
}

export var getDailyworkByDate = (date) => {
    return axios.get(BASE_URL+'api/dailyWages/date/'+date);
}
