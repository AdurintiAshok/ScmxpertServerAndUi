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
  const [loader,setLoader]=useState(false)
  const filteredUsers = allUsers?.filter(user => user.role === 'User');
  const filteredAdmins=allUsers?.filter(user=>user.role==='Admin')
  const navigate=useNavigate();
  const MAX_SHIPEMENT_COUNT=100;
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
      if(data.length==0){
        setLoader(true)
      }
      else{
        setLoader(false)
      }
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
   if(matchedUser.role=="User"){
    navigate('*')
   }
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
    ["Shipments", "Shipments Count"],
    ["Created_Shipments",shipments.length],
    ["Pending",MAX_SHIPEMENT_COUNT-shipments.length],
  ];
  const users = [
    ["Users", "Users Count"],
    ["Users",filteredUsers.length],
    ["Admins" ,filteredAdmins.length],

  ];
   const optionsForShipments = {
    title:"Number of Shipments",
    colors:['#DFD0B8','#153448']
  };

  const optionsForUsers = {
    title:" Number of Users",
    colors: ['#F9B572','#99B080']
  };
 
  return (
        <div style={{ overflowX: "hidden",overflowY:'auto', background: "#E4E9F7", height: "100%" ,width:'100%'}}>
        <Sidebar/>
   

        <div className="newship">
        <div class="container">
  {userData && userData.role === 'Admin' ? (
<div className='maindiv '>
<div className="row" >
  <div className="col-12 col-md-6">
    <Chart
      chartType="PieChart"
      data={shipmentss}
      options={optionsForShipments}
      width={"100%"}
      height={"400px"}
    />
  </div>
  <div className="col-12 col-md-6">
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
  !loader ?
  (
   <div className="loader-container">
   <div className="loaderforstream">
<div className="dot"></div>
<div className="dot"></div>
<div className="dot"></div>
</div>
</div>
  ) :(  <div className="loader-container">
<p>Something Went Wrong Please Login Again</p>
  </div>)
)}
</div>
</div>
       </div>
  )
}

export default ChartComponent
