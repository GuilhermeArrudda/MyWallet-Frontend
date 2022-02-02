import axios from "axios";

const BASE_URL = "http://localhost:5000"

function sendSignInRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body);
};

function sendSignUpRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body)
}

export {
    sendSignInRequest,
    sendSignUpRequest
};