import axios from 'axios';

const restCountriesApi = axios.create({
    baseURL: '/api/v3_countries',
});

export default restCountriesApi