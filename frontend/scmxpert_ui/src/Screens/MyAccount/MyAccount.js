import React,{useEffect, useState}from 'react'
import ExfLogo from '../../assets/exf-png.png'
import './MyAccount.css'
import { IoIosClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Metrics from '../Metrics/Metrics';
import Sidebar from '../../Components/Sidebar';
import User from '../../assets/User.jpg'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import AuthFunction from '../../Auth/Auth';
import { KeyData } from '../../ENDPOINTS/EndPoint';
const MyAccount = () => {
  const [email,setEmail]=useState('');
  const [allUsers,setAllUsers]=useState([]);
  const [userData,setUserData]=useState([])
const navigate=useNavigate();
async function getAllUsers(){
  const token=localStorage.getItem('TokenValue')
  try {
    const response = await fetch(`${KeyData.api_end_point}/getUserByEmail`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
        // Replace yourAuthToken with the actual authentication token
      },
      mode: 'cors'
    });
    if(response.status==200){
      const data = await response.json();
      console.log("allUsers",data)
      // setAllUsers(data);
      // filterUsers(data);
      setUserData(data)
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
  }
}
  useEffect(()=>{
   

    const isAuthenticated =AuthFunction();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
   
      checkTokenValidity();
    }
  
  },[]);
  const checkTokenValidity = async () => {
    const token = localStorage.getItem('TokenValue');
    try {
      const response = await fetch(`${KeyData.api_end_point}/validate-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors' // Ensures requests include CORS headers
      });
      const data = await response.json();
  
      if (!data || response.status !== 200) {
        // Token is expired or not validated
        console.log("Token is expired or not validated. Logging out...");
        toast.error("Token Has Expired Logging Out.........", { toastId: 'success1' });
  
        const timeoutId = setTimeout(() => {
          navigate('/login');
        }, 3000); // Timeout in milliseconds (3 seconds)
      }
      else {
        getAllUsers();
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };
  
  return (
    <div style={{overflowX:'hidden',background:'#E4E9F7',height:'100%'}}>
          <ToastContainer/>
    <Sidebar/>
    <section className="vh-100 " style={{ overflow: 'hidden' }}>
  <div className="container py-3">
    <div className="row justify-content-center">
      <div className="col col-md-9 col-lg-7 col-xl-5">
        <div className="card text-center text-md-left" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div className="card-body p-4">
            <div className="d-md-flex justify-content-center align-items-center text-black">
              <div className="flex-shrink-0 mb-3 mb-md-0">
                <img
                  src={User}
                  alt="Generic placeholder image"
                  className="img-fluid"
                  style={{ maxWidth: '180px', borderRadius: '10px' }}
                />
              </div>
              <div className="flex-grow-1 ms-md-3">
                <h5 className="mb-1">{userData.userName}</h5>
                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                  {userData.userEmail}
                </p>
              
                {/* <div className="d-md-flex justify-content-center d-lg-block">
                  <button type="button" className="btn btn-outline-primary me-1 mb-2 mb-md-0">
                    Chat
                  </button>
                  <button type="button" className="btn btn-primary me-1 mb-2 mb-md-0">
                    Follow
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>






    </div>
  )
}

export default MyAccount
