import React, { useState } from "react";
import './signin.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signin() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/signin', values);
            console.log(res.data);
            
            // Handle the response based on your server's response structure
            if (res.data.success) {
                navigate('/Dashboard');
            } else {
                alert(res.data.message || "Signin failed. Please check your credentials.");
            }
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleSignupClick = () => {
        navigate("/signup");
    };

    return (
        <div className="main">
            <div className="container" id="register">
                <h1 className="form-title">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            value={values.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$"
                            title="Password must be 7-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                            value={values.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="submit" className="btn" value="Sign in" />
                </form>
                <p className="or">------------------or------------------</p>
                <div className="links">
                    <p>Don't have an account?</p>
                    <button onClick={handleSignupClick} id="signup-button">Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Signin;
