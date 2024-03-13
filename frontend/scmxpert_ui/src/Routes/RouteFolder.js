import React from 'react'
import { Route, Router,Routes } from 'react-router-dom'
import App from '../App'
import HomeFolder from '../Home/HomeFolder'
import AboutFolder from '../About/About'
import EmptyRoute from '../NoPage/EmptyRoute'
import Login from '../Screens/Login/Login'
import ForgetPassword from '../Screens/ForgotPassword/ForgetPassword'
import Signup from '../Screens/Signup/Signup'
import Dash from '../Screens/DashBord/Dash'
import MyAccount from '../Screens/MyAccount/MyAccount'
import NewShipment from '../Screens/NewShipment/NewShipment'
import MyShipment from '../Screens/MyShipment/MyShipment'
import DataStream from '../Screens/DataStream/DataStream'
const RouteFolder = () => {
  const routes = [
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/forgotpassword', element: <ForgetPassword /> },
    { path: '/about', element: <AboutFolder /> },
    { path: '/signup', element: <Signup /> },
    { path: '/dash', element: <Dash /> },
    { path: '/myaccount', element: <MyAccount /> },
    { path: '/newshipment', element: <NewShipment /> },
    { path: '/myshipment', element: <MyShipment /> },
    { path: '/datastream', element: <DataStream /> },
    { path: '*', element: <EmptyRoute /> },
    

  ];
  return (
    <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
  )
}

export default RouteFolder;
