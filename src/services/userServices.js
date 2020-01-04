import axios from 'axios';
import userApiConstant from '../apiConstants/userApiConstant'

export async function login(loginData){
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstant.login, loginData);
        return response;
    }
    catch (error) { }
}

export async function signUp(signUpData){
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstant.signUp, signUpData);
        return response;
    }
    catch (error) {
        return error;
    }
}