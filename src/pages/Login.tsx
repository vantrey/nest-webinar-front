import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {ErrorContext} from "../ErrorContext";
import './Form.css';
import {getAxiosInstance} from "../axiosInstnce";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { setError } = useContext(ErrorContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await getAxiosInstance().post('/auth/login', { email, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            history.push('/books');
        } catch (error: any) {
            setError(error)
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
