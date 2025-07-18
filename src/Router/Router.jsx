import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Coverage from '../Pages/Coverage/Coverage';
import Loading from '../Pages/Loading/Loading';
import SendParcel from '../Pages/SendParcel/SendParcel';
import PrivateRoutes from '../Routes/PrivateRoutes';
import DashboardLayout from '../Layouts/DashboardLayout';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import Overview from '../Pages/Dashboard/Overview/Overview';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import BeARider from '../Pages/BeARider/BeARider';
import PendingRiders from '../Pages/Dashboard/PendingRiders/PendingRiders';
import ActiveRiders from '../Pages/Dashboard/ActiveRiders/ActiveRiders';
import MakeAdmin from '../Pages/Dashboard/MakeAdmin/MakeAdmin';
import AdminRoutes from '../Routes/AdminRoutes';
import Forbidden from '../Pages/Forbidden/Forbidden';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/public/warehouses.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'send-parcel',
                element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
                loader: () => fetch('/public/warehouses.json'),
                hydrateFallbackElement: <Loading></Loading>                
            },
            {
                path: 'BeARider',
                element: <PrivateRoutes><BeARider></BeARider></PrivateRoutes>,
                loader: () => fetch('/public/warehouses.json'),
                hydrateFallbackElement: <Loading></Loading>                  
            },
            {
                path: '/forbidden',
                Component: Forbidden,
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register,
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <PrivateRoutes><Overview></Overview></PrivateRoutes>       
            },
            {
                path: 'payment/:parcelId',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            {
                path:'my-parcels',
                element: <PrivateRoutes><MyParcels></MyParcels></PrivateRoutes>
            },
            {
                path: 'payment-history',
                Component: PaymentHistory,
            },
            {
                path: 'active-riders',
                element: <ActiveRiders><ActiveRiders></ActiveRiders></ActiveRiders>
            },
            {
                path: 'pending-riders',
                element: <AdminRoutes><PendingRiders></PendingRiders></AdminRoutes>
            },
            {
                path: 'make-admin',
                element: <AdminRoutes><MakeAdmin></MakeAdmin></AdminRoutes> 
            }
        ]
    },
])

export default router;