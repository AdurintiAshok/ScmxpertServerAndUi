import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import "../Metrics/Metrics.css";
import Architecture from "../../assets/architecture.jpg";
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AuthFunction from "../../Auth/Auth";
import { KeyData } from "../../ENDPOINTS/EndPoint";
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "Containers Countries",
  is3D: true,
  backgroundColor: "#E4E9F7",
};
export default function Metrics() {
const navigate=useNavigate();
  const checkTokenValidity = async () => {
    const token= localStorage.getItem('TokenValue');
    console.log(token)
    try {
      const response = await fetch(`${KeyData.api_end_point}/validate-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
          // Replace yourAuthToken with the actual authentication token
        }
      });
      const data = await response.json();
      console.log(data)
      if (!data) {
        // Token is expired or not validated
        // Perform logout action
        console.log("Token is expired or not validated. Logging out...");
        toast.error("Token Has Expired Logging Out.........", { toastId: 'success1' });

        // Set timeout to navigate to login page after 3 seconds
        const timeoutId = setTimeout(() => {
          navigate('/login');
        }, 3000); // Timeout in milliseconds (3 seconds)

      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };
  useEffect(()=>{
    const isAuthenticated = AuthFunction();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      checkTokenValidity();
    }
  
  },[])
  return (
    <div className="container mt-3 container-for-desktop">
          <ToastContainer/>
      <div className="row">
        <div>
          <div class="architecture-container ">
            <div class="component wide">SCMLite Architecture</div>
            <div class="component half-wide">Data Source</div>
            <div class="component half-wide">Stream Processing</div>
            <div class="component half-wide">DataBase</div>
            <div class="component half-wide">Users</div>
            <div class="component">Socket Server</div>
            <div class="arrow">→</div>
            <div class="component">Java Producer</div>
            <div class="arrow">→</div>

            <div class="component">Kafka Broker</div>

            <div class="arrow">→</div>
            <div class="component">Java Consumer</div>
            <div class="arrow">→</div>
            <div class="component">MongoDb</div>
            <div class="arrow">→</div>
            <div class="component">Application</div>

            <div class="component wide">Services</div>
            <div class="component wide">AWS EC2 Instance (t2.micro)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
