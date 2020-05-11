import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const ODOO_ROOT_URL = 'http://localhost';
const responseBody = res => res.body.result
const httpResponseBody = res => res.text
const httpJSONResponseBody = res => JSON.parse(res.text)

const jsonHeader = (req) => req.set('Content-Type', 'application/json');

// eslint-disable-next-line
const requests = {
    get: (url) =>
        superagent.get(`${ODOO_ROOT_URL}${url}`).then(httpJSONResponseBody),
    post: (url, params) => 
        superagent.post(`${ODOO_ROOT_URL}${url}`, {params}).use(jsonHeader).then(responseBody),
    put: (url, params) => 
        superagent.put(`${ODOO_ROOT_URL}${url}`, {params}).use(jsonHeader).then(responseBody),
    delete: (url) =>
        superagent.del(`${ODOO_ROOT_URL}${url}`).then(httpResponseBody)
};

const API = {
    getMyClasses: (params) =>
        requests.post(`/api/classes`,params)
};

const Auth = {
    login: (credentials) => 
        requests.post('/auth/login', credentials),
    register: (credentials) => 
        requests.post('/auth/register', credentials),
    logout: () => 
        requests.post('/auth/logout'),
    invite: (params) =>
        requests.post('/auth/mail', params)
}

export default {
    API,
    Auth
}