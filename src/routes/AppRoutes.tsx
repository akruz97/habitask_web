import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/protected/Home'
import { LoginPage } from '../pages/public/Login'
import { PrivateRoutes } from '../pages/protected'
import { PublicRoutes } from '../pages/public'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export const AppRoutes = () => {

    const { status } = useSelector((state: RootState) => state.auth);

    if(status === 'checking'){
        return <p>Loading....</p>
    }

    return (
        <BrowserRouter>
            <Routes>
               {/* {
                    status == "authenticated"  ?  */}
                   
                    <Route path='/' element={<PublicRoutes />} />
                    <Route path='/' element={<PrivateRoutes />} />
               {/* } */}
               {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}
            </Routes>
        </BrowserRouter>
    )
}