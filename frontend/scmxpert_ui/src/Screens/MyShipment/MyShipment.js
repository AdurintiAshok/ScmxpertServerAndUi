import React, { useState } from "react";
import "../DataStream/DataStream.css";
import "./MyShipment.css"
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
const MyShipment = () => {
  const [shipments,setShipMents]=React.useState([]);
  const [deviceId,setDeviceId]=useState('')
  const [filteredOptions,setFilteredOptions]=useState([]);
  const [shipmentNumberError, setShipmentNumberError] = useState("");
  const navigate=useNavigate();
  React.useEffect(()=>{
    async function fetchShipments() {
      const token=localStorage.getItem('TokenValue')
      try {
        const response = await fetch('http://localhost:8080/shipments',    {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'

            // Replace yourAuthToken with the actual authentication token
          },
          body: JSON.stringify({ userEmail: localStorage.getItem('UserName') })
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setShipMents(data)
        console.log('Shipments:', data);
        return data; // Return the fetched data if needed
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error if needed
      }
    }
    
    // Call the fetchShipments function to initiate the fetch request
    fetchShipments();
    checkTokenValidity();
  },[])
  const checkTokenValidity = async () => {
    const token= localStorage.getItem('TokenValue');
   console.log(token)
    try {
      const response = await fetch('http://localhost:8080/profile', {
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
    const filterResult = shipments.filter((item) => {
      return item.deviceId === deviceId;
    });
    setFilteredOptions(filterResult);
    console.log(filterResult);
  }
  const renderTableRows = (data) => {
    return data.map((shipment, index) => (
      <tr key={index}>
        <td className="px-4 py-3">{shipment.shipmentNumber}</td>
        <td className="px-4 py-3">{shipment.containerNumber}</td>
        <td className="px-4 py-3">{shipment.deliveryNumber}</td>
        <td className="px-4 py-3">{shipment.deviceId}</td>
        <td className="px-4 py-3">{shipment.expectedDeliveryDate}</td>
        <td className="px-4 py-3">{shipment.goodsType}</td>
        <td className="px-4 py-3">{shipment.ndcNumber}</td>
        <td className="px-4 py-3">{shipment.poNumber}</td>
        <td className="px-4 py-3">{shipment.routeName}</td>
        <td className="px-4 py-3">{shipment.serialNumberOfGoods}</td>
        <td className="px-4 py-3">{shipment.shipmentDescription}</td>
      </tr>
    ));
  };
  
  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" ,width:'100%'}} >
      <Sidebar />
<div >
<div class="container" style={{marginTop:'2%'}}>
      <form>
      <div className="row mb-4" style={{ background: '#f3eae8', padding: '30px' }}>
      <h4>Please Select a Device Id to see the Data Stream</h4>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Example select</label>
        <div className="d-flex flex-column">
          <select className="form-control form-select mb-2" id="exampleFormControlSelect1" onChange={(e)=>{
            setDeviceId(e.target.value)
          }}>
            <option selected>Select Device ID</option>
            <option value="202348">202348</option>
            <option value="302442">302442</option>
          </select>
          <button type="button" className="btn btn-outline-success btn-lg" onClick={()=>{onDeviceIdSelection()}}>Get Device Data</button>
        </div>
      </div>
    </div>
  <div class="row tableship" >
  <table className="table table-striped mb-2 " >
  <thead>
    <tr>
      <th scope="col">Shipment Number</th>
      <th scope="col">Container Number</th>
      <th scope="col">Delivery Number</th>
      <th scope="col">Device ID</th>
      <th scope="col" >Expected Delivery Date</th>
      <th scope="col">Goods Type</th>
      <th scope="col">NDC Number</th>
      <th scope="col">PO Number</th>
      <th scope="col">Route Name</th>
      <th scope="col">Serial Number of Goods</th>
      <th scope="col">Shipment Description</th>
    </tr>
  </thead>
  <tbody>
  {filteredOptions.length > 0 ? renderTableRows(filteredOptions) : renderTableRows(shipments)}
  </tbody>
</table>

  </div>
  </form>
</div>
</div>
    </div>
  );
};

export default MyShipment;
