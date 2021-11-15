import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export var getAllLabours = () => {
    return axios.get(BASE_URL+'/employee/');
}

export var addDailywork = (dailyWork) => {
    return axios.post(BASE_URL+'/dailywork',dailyWork);
}

export var getDailyworkByDate = (date) => {
    return axios.get(BASE_URL+'/dailywork/all/'+date);
}
