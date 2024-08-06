import axios from 'axios';
import { toast } from 'react-toastify';

export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT = 'LOGOUT';

const notifydata = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const successNotify = (message) => toast.success(message, notifydata);
const errorNotify = (message) => toast.error(message, notifydata);

export const checkAuth = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                authtoken: token,
                user: {
                    _id: localStorage.getItem('userid'),
                    usertype: localStorage.getItem('usertype')
                }
            }
        });
    } else {
        dispatch({
            type: LOGIN_FAIL,
            payload: {}
        });
    }
};

export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/user/login', { email, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        successNotify("Login successful!");
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        });
        errorNotify("Login failed. Please try again.");
    }
};

export const register = (name, email, password, usertype) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/user/createuser', { name, email, password, usertype });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        successNotify("Registration successful! Now you can login");
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data
        });
        errorNotify("Registration failed. Please try again.");
    }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    successNotify("Logout successful!");
};
