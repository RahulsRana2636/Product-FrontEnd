import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../IMG/product1.jpg';
import '.././styles/login.css';
import { ToastContainer } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }       
    }, [isAuthenticated, navigate]);
 
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={img1} alt="images" />
            </div>
            <div className="login-form">
                <h2>Sign In</h2>
                <p>Don’t have an account yet? <Link to="/signup"className="no-underline">Sign Up</Link></p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Your username or email address</label>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                    
                    <div className="login-options">
                        <label>
                            <input type="checkbox" name="remember" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                    </div>
                    
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
