import React from 'react';
import { Routes, Route } from "react-router-dom";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import Protected from '../pages/protected/Protected';
import { Header } from '../components/Header';

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route : any, idx : any) => (
                        <Route
                            path={route.path}
                            element={route.component }
                            key={idx}
                            // exact={true}
                        />
                    ))}
                </Route>

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <Protected>
                                    <Header />
                                   {route.component}
                                </Protected>}
                            key={idx}
                            // exact={true}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;