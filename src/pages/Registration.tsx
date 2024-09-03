// src/pages/Registration.js
import React, {useContext, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {ErrorContext} from "../ErrorContext";
import './Form.css';
import {getAxiosInstance} from "../axiosInstnce";

function Registration() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const { setError } = useContext(ErrorContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            await getAxiosInstance().post('/users/registration', { email, name, age, password })
            history.push('/auth/login');
        } catch (error: any) {
            setError(error)
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Registration;
