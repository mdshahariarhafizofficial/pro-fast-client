import React from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {
    const contextData = {
        name: 'Fahad',
    }
    return (
        <AuthContext value={contextData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;