import React, { useState } from "react";
import './Signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        FirstName: '',
        LastName: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log(res.data);  
                // Assuming successful signup, navigate to signin page
                navigate("/Signin");
            })
            .catch(err => {
                console.error('Error:', err); 
            });
    };

    const handleSigninClick = () => {
        navigate("/Signin");
    };

    return (
        <div className="main">
            <div className="container" id="signup">
                <h1 className="form-title">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="FirstName"
                            value={values.FirstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                        />
                        <label htmlFor="fname">First Name</label>
                    </div>
                    <div className="input-group">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="LastName"
                            value={values.LastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                        />
                        <label htmlFor="lname">Last Name</label>
                    </div>
                    <div className="input-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$"
                            title="Password must be 7-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="submit" className="btn" value="Sign Up" name="signup" />
                </form>
                <p className="or">------------------or------------------</p>
                <div className="links">
                    <p>Already have an account?</p>
                    <button onClick={handleSigninClick} id="signin-button">Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
