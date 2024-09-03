import React, { useContext } from 'react';
import { ErrorContext } from '../ErrorContext';
import './ErrorPopup.css';

const ErrorPopup: React.FC = () => {
    const { error, clearError } = useContext(ErrorContext);

    if (!error) return null;

    let messageContent;

    if (error.response && error.response.status === 400 && Array.isArray(error.response.data.message)) {
        messageContent = (
            <ul>
                {error.response.data.message.map((msg: string, index: number) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        );
    } else if (error.response && error.response.data && typeof error.response.data.message === 'string') {
        messageContent = <p>{error.response.data.message}</p>;
    } else {
        messageContent = <p>Something went wrong. Please try again later.</p>;
    }

    return (
        <div className="error-popup">
            {messageContent}
            <button className="close-button" onClick={clearError}>Close</button>
        </div>
    );
};

export default ErrorPopup;
