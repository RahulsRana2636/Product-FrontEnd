import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import img1 from '../../IMG/product1.jpg';
import '.././styles/login.css';
import { ToastContainer } from "react-toastify";


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        usertype: 'Student'
    });

    const dispatch = useDispatch();
    
    const { name, email, password, usertype } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(register(name, email, password, usertype));
    };

    return (
        <div className="login-container">
        <div className="login-image">
            <img src={img1} alt="images" />
        </div>
        <div className="login-form">
            <h2>Sign Up</h2>
            <p>Already have an account yet? <Link to="/login"className="no-underline">Sign In</Link></p>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Your username </label>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                <label htmlFor="email">Email address</label>
                <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                
                <div className="login-options">
                    <label>
                        <input type="checkbox" name="remember" />
                        I agree with Privacy Policy and Terms of Use
                    </label>
                </div>
                
                <button type="submit">Sign In</button>
            </form>
        </div>
        <ToastContainer/>
    </div>
    
);
};

export default SignUp;
