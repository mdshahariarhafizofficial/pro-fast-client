import React from 'react';
import useAuth from '../Hooks/UseAuth';
import Loading from '../Pages/Loading/Loading';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoutes;