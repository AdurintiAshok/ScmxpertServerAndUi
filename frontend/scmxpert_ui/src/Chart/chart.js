import React,{useEffect, useState} from 'react'
import '../Chart/chart.css'
import { Chart } from "react-google-charts";
import Sidebar from '../Components/Sidebar';
import './chart.css'
import { redirect, useNavigate } from 'react-router-dom';
import AuthFunction from '../Auth/Auth';
import { KeyData } from "../ENDPOINTS/EndPoint";
const ChartComponent = () => {
  const [filteredOptions,setFilteredOptions]=useState([]);
  const [allUsers,setAllUsers]=useState([]);
  const [userData,setUserData]=useState({});
  const [shipments,setShipMents]=useState([]);
  const filteredUsers = allUsers?.filter(user => user.role === 'User');
  const navigate=useNavigate();
  const MAX_USERS=100;
useEffect(()=>{


  async function fetchShipments(dataPass) {
    const token=localStorage.getItem('TokenValue')
    try {
      const response = await fetch(`${KeyData.api_end_point}/shipments`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
          // Replace yourAuthToken with the actual authentication token
        },
        body: JSON.stringify({ userEmail: dataPass?.userEmail,
        role:dataPass?.role })
      });
      
      if (!response.ok) {
        // navigate('/login')
      }
      const data = await response.json();
      setShipMents(data)
      console.log('ShipmentsFrom Data:', data);
      return data; // Return the fetched data if needed
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error if needed
    }
  }
  async function filterUsers(allUsers){
    const userEmail= localStorage.getItem('UserName');
    console.log(userEmail)
    const matchedUser = allUsers.find(user => user.userEmail === userEmail);
    console.log("macthed",matchedUser)
    fetchShipments(matchedUser);
    setUserData(matchedUser)
    
  }
  async function getAllUsers(){
    const token=localStorage.getItem('TokenValue')
    try {
      const response = await fetch(`${KeyData.api_end_point}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
          // Replace yourAuthToken with the actual authentication token
        }
      });
      if(response.status==200){
        const data = await response.json();
        console.log("allUsers",data)
        setAllUsers(data);
        filterUsers(data)
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  }
  const isAuthenticated = AuthFunction();
  if (!isAuthenticated) {
    navigate('/login');
  } else {
    getAllUsers();
  }
 
},[userData.role])
   const shipmentss = [
    ["Task", "Hours per Day"],
    ["Created_Shipments",shipments.length],
    ["Pending", MAX_USERS-shipments.length],
  ];
  const users = [
    ["Task", "Hours per Day"],
    ["Current_Users",filteredUsers.length],
    ["Pending" ,MAX_USERS-allUsers.length],

  ];
   const optionsForShipments = {
    title:"Shipment Activities",
    colors:['#DFD0B8','#153448']
  };

  const optionsForUsers = {
    title:"Users Activities",
    colors: ['#F9B572','#99B080']
  };
 
  return (
        <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" ,width:'100%'}}>
        <Sidebar/>
  {userData && userData.role === 'Admin' ? (
<div className='maindiv '>
<div className="row " style={{zIndex:-1}}>
  <div className="col-12 col-md-6">
    <Chart
      chartType="PieChart"
      data={shipmentss}
      options={optionsForShipments}
      width={"100%"}
      height={"400px"}
    />
  </div>
  <div className="col-12 col-md-6" style={{ margin: "0 auto", maxWidth: "100%" }}>
    <Chart
      chartType="PieChart"
      data={users}
      options={optionsForUsers}
      width={"100%"}
      height={"400px"}
    />
  </div>
</div>
  </div>

) : (
  <div className="loader-container">
  <div className="circular-loader"></div>
</div>
)}
       </div>
  )
}

export default ChartComponent
