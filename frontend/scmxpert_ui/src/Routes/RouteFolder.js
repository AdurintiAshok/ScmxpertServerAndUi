import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AboutFolder from '../About/About';
import EmptyRoute from '../NoPage/EmptyRoute';
import Login from '../Screens/Login/Login';
import ForgetPassword from '../Screens/ForgotPassword/ForgetPassword';
import Signup from '../Screens/Signup/Signup';
import Dash from '../Screens/DashBord/Dash';
import MyAccount from '../Screens/MyAccount/MyAccount';
import NewShipment from '../Screens/NewShipment/NewShipment';
import MyShipment from '../Screens/MyShipment/MyShipment';
import DataStream from '../Screens/DataStream/DataStream';
import PasswordResetForm from '../Screens/PasswordUpdate/PasswordResetForm';
import ChartComponent from '../Chart/chart';
import Gemini from '../Components/Gemini';
import GeminiInReact from '../About/About';

const RouteFolder = () => {


  // Define protected routes
  const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <Login /> },
    { path: '/forgotpassword', element: <ForgetPassword /> },
    { path: '/about', element: <GeminiInReact /> },
    { path: '/signup', element: <Signup /> },
    { path: '/architecture', element:  <Dash />  },
    { path: '/myaccount', element: <MyAccount /> },
    { path: '/newshipment', element:  <NewShipment />  },
    { path: '/myshipment', element: <MyShipment /> },
    { path: '/datastream', element:  <DataStream />  },
    { path: '/chart', element:  <ChartComponent /> },
    { path: '/reset-password', element:  <PasswordResetForm /> },
    { path: '*', element: <EmptyRoute />  },
    { path: 'Gemini', element: <Gemini />  },
  ];
  
  return (
    <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
  );
};

export default RouteFolder;
