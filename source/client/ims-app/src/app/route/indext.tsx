// AppRoutes.tsx
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Index from '../login/index';
import { PrivateRoute } from './private-route';
import { Dashboard } from '../dashboard';

const AppRoutes: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('secret'); 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Outlet />} />
                <Route index element={<Navigate to={'/login'} />} />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/home/dashboard" />
                        ) : (
                            <Index />
                        )
                    }
                />
                <Route
                    path="/home"
                    element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                    <Route path="/home/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
