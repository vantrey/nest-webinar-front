// src/components/BaseUrlInput.js
import React, { useState, useEffect } from 'react';
import './BaseUrlInput.css'; // Добавим файл с CSS-стилями

function BaseUrlInput({ onBaseUrlChange }: {onBaseUrlChange: (baseUtl: string) => void}) {
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        const savedBaseUrl = localStorage.getItem('baseUrl') || '';
        setBaseUrl(savedBaseUrl);
        if (savedBaseUrl) {
            onBaseUrlChange(savedBaseUrl);
        }
    }, [onBaseUrlChange]);

    const handleSetBaseUrl = () => {
        localStorage.setItem('baseUrl', baseUrl);
        onBaseUrlChange(baseUrl);
    };

    return (
        <div className="base-url-input-container">
            <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="http://your-api-base-url/"
                className="base-url-input"
            />
            <button onClick={handleSetBaseUrl} className="base-url-button">
                Set Base URL
            </button>
        </div>
    );
}

export default BaseUrlInput;
