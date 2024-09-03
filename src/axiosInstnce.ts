// src/axiosInstance.js
import axios from 'axios';

let axiosInstance: any;

export const createAxiosInstance = (baseURL: string) => {
    axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        },
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const getAxiosInstance = () => {
    return axiosInstance;
};
