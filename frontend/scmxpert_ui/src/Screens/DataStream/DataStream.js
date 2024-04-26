import React, { useState } from "react";
import "./DataStream.css";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import AuthFunction from "../../Auth/Auth";
import { KeyData } from "../../ENDPOINTS/EndPoint";
const DataStream = () => {
  const [shipments,setShipMents]=React.useState([]);
  const navigate=useNavigate();
  const [deviceId,setDeviceId]=useState(0)
  const [filteredOptions,setFilteredOptions]=useState([]);
  const [allUsers,setAllUsers]=useState([]);
  const [userData,setUserData]=useState([])
  const [deviceIds, setDeviceIds] = useState([]);
  const [sensorData,setSensorData]=useState([]);
  React.useEffect(()=>{
    async function fetchShipments(dataPass) {
      console.log("dataPass",dataPass)
      const token=localStorage.getItem('TokenValue')
      try {
        const response = await fetch('http://localhost:8080/streamdata', 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            // Replace yourAuthToken with the actual authentication token
          },
        });
        if (!response.ok) {
          // navigate('/login')
        }
        const data = await response.json();
        console.log(data);
        const extractedDeviceIds = Array.from(new Set(data.map(obj => obj.device_ID)));
        setDeviceIds(extractedDeviceIds);
        
        setSensorData(data);
        console.log('ShipmentsFrom Data:', data);
        return data; // Return the fetched data if needed
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error if needed
      }
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
          filterUsers(data);
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
      }
    }
    async function filterUsers(allUsers){
      const userEmail= localStorage.getItem('UserName');
      console.log(userEmail)
      const matchedUser = allUsers.find(user => user.userEmail === userEmail);
      console.log("macthed",allUsers)
      fetchShipments(matchedUser);
      setUserData(matchedUser)
      
    }
    const isAuthenticated = AuthFunction();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      getAllUsers();
      checkTokenValidity();
    }
  
  },[])

  const checkTokenValidity = async () => {
    const token= localStorage.getItem('TokenValue');
   console.log(token)
    try {
      const response = await fetch(`${KeyData.api_end_point}/profile`, {
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
        navigate('/login')
        // Perform logout action here, such as clearing local storage, redirecting to login page, etc.
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };
  const onDeviceIdSelection=()=>{
    console.log(filteredOptions.length)
    const filterResult = sensorData.filter((item) => {
      return item.device_ID ==deviceId;
    });
    console.log(filterResult)
    setFilteredOptions(filterResult);
  }
  const renderTableRows = (data) => {
    return data.map((shipment, index) => (
      <tr key={index}>
          <td className="px-4 py-3">{index+1}</td>
        <td className="px-4 py-3">{shipment.battery_Level}</td>
        <td className="px-4 py-3">{shipment.device_ID}</td>
         <td className="px-4 py-3">{shipment.first_Sensor_temperature}</td>
<td className="px-4 py-3">{shipment.route_From}</td>
<td className="px-4 py-3">{shipment.route_To}</td>
<td className="px-4 py-3">{shipment.timestamp}</td>

      
      </tr>
    ));
  };
  
  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" ,width:'100%'}}>
      <Sidebar />
<div>

<div class="container" style={{marginTop:'2%'}}>
  
{userData && userData.role == 'Admin' 
? (
      <form>
      <div className="row mb-4" style={{ background: '#f3eae8', padding: '30px' }}>
      <h4>Select Device Id to see the Perticular Data Stream</h4>
      <div className="form-group">
        {/* <label htmlFor="exampleFormControlSelect1">Select DeviceId</label> */}
        <div className="d-flex flex-column">
        <select 
        className="form-control form-select mb-2" 
        id="exampleFormControlSelect1" 
        onChange={(e) => {
          setDeviceId(e.target.value);
        }}
        style={{
     
          overflow: deviceIds.length > 3 ? 'auto' : 'hidden',
        }}
      
      >
        <option disabled={!deviceId} selected={!deviceId}>Select Device ID</option>
        {deviceIds.map((id, index) => (
          <option key={index} value={id}>{id}</option>
        ))}
      </select>

          <button type="button" className="btn btn-outline-success btn-lg" onClick={()=>{onDeviceIdSelection()}}>Get Device Data</button>
        </div>
      </div>
    </div>
    {!sensorData.length > 0 ? (
  <div className="loader-container">
    <div className="circular-loader"></div>
  </div>
) : (
  <div className="row dataship" style={{ maxHeight: '620px', overflow: 'auto' }}>
    <table className="table table-striped mb-2">
      <thead>
        <tr className="">
          <th className="px-4 py-3">S.NO</th>
        
          <th  className="py-3">Battery Level</th>
          <th className="py-3">Device ID</th>
          <th className="py-3">Sensor Temperature</th>
          <th className="px-4 py-3">Route From</th>
          <th className="px-4 py-3">Route To</th>
          <th className="px-4 py-3">Created At</th>
        </tr>
      </thead>
      <tbody>
        {filteredOptions.length > 0 ? renderTableRows(filteredOptions) : renderTableRows(sensorData)}
      </tbody>
    </table>
  </div>
)}

  </form>
  ) : (
  null
)}
</div>

</div>

    </div>
  );
};

export default DataStream;
