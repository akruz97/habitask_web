import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Home';
import { TasksPage } from './Tasks';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/home'   element={<HomePage />} />
        </Routes>
    );
};
