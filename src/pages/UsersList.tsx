import React, { useEffect, useState, useContext } from 'react';
import { ErrorContext } from '../ErrorContext';
import './UserList.css';
import {getAxiosInstance} from "../axiosInstnce";

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const axiosInstance = getAxiosInstance();
                const response = await axiosInstance.get('/users');
                setUsers(response.data);
            } catch (error: any) {
                setError(error); // Передаем ошибку в контекст
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [setError]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-list-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
