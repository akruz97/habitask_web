import React from "react";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/protected/Home";
import { TasksPage } from "../pages/protected/Tasks";
import { LoginPage } from "../pages/public/Login";
import { SignUpPage } from "../pages/public/SignUp";


const NotFound = () => {
    return <div>
        <h1>Not Found</h1>
    </div>
}

const authProtectedRoutes = [
  { path: "/home", component: <HomePage /> },
  { path: "/tasks", component: <TasksPage /> },
//   { path: "/index", component: <HomePage /> },
  {
    path: "/",
    exact: true,
    component:  <NotFound />,
  },
  { path: "*", component: <NotFound /> },
];

const publicRoutes = [
  { path: "/login", component: <LoginPage /> },
//   { path: "/logout", component: <Logout /> },
  { path: "/signup", component: <SignUpPage /> },

];

export { authProtectedRoutes, publicRoutes };