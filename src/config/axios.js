//export const BASE_URL = 'http://localhost:8081/api/v1/';
//export const BASE_URL2 = 'http://localhost:8081/api/v1/';

/*
Veterinários, Tutores, Animais, Espécies e Raças:
https://my-json-server.typicode.com/nicolas-jao/jsonfake


Consultas e Procedimentos:
https://my-json-server.typicode.com/nicolas-jao/jsonfake2
*/

import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/'; 

const instance = axios.create({
    baseURL: API_URL
});

export default instance;