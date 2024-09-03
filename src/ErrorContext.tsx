import React, { createContext, useState } from 'react';

interface ErrorContextProps {
    error: any;
    setError: (error: any) => void;
    clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextProps>({
    error: null,
    setError: () => {},
    clearError: () => {},
});

export const ErrorProvider = ({ children }: { children: any }) => {
    const [error, setErrorState] = useState<any>(null);

    const setError = (error: any) => {
        setErrorState(error);
    };

    const clearError = () => {
        setErrorState(null);
    };

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};
