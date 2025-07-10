import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Loading/Loading';
import useUserRole from '../Hooks/useUserRole';

const AdminRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoutes;