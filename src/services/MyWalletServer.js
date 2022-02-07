import axios from "axios";

const BASE_URL = "http://localhost:5000"

function generateConfig (token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

function sendSignInRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body);
};

function sendSignUpRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body);
}

function sendLogoutRequest (token) {
    return axios.post(`${BASE_URL}/logout`, {}, generateConfig(token));
};

function getBankOperationsRequest (token) {
    return axios.get(`${BASE_URL}/homepage`, generateConfig(token));
};

function postBankOperationsRequest (body, token) {
    return axios.post(`${BASE_URL}/homepage`, body, generateConfig(token));
};

function deleteBankOperationRequest (id, token) {
    return axios.delete(`${BASE_URL}/homepage/${id}`, generateConfig(token))
}

export {
    sendSignInRequest,
    sendSignUpRequest,
    sendLogoutRequest,
    getBankOperationsRequest,
    postBankOperationsRequest,
    deleteBankOperationRequest
};