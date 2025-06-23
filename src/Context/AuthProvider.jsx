import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Current User
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User From Auth :', currentUser);
            setLoading(false)
        });
        return () => {
            unsubscribe()
        }
    }, [])
    // Login User
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(email, password);
    }

    // Logout User
    const logout = () => {
        return signOut(auth);
    }


    const contextData = {
        createUser,
        loading,
        user,
        setUser,
        loginUser,
        logout,
    }
    return (
        <AuthContext value={contextData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;