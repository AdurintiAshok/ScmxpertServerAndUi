import React, { useEffect, useState } from "react";
import "../NewShipment/NewShipment.css";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthFunction from "../../Auth/Auth";
import { KeyData } from "../../ENDPOINTS/EndPoint";
const NewShipment = () => {

  const navigate = useNavigate();
  const [shipmentNumber, setShipmentNumber] = useState('');
  const [containerNumber, setContainerNumber] = useState('');
  const [routeName, setRouteName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [ndcNumber, setNdcNumber] = useState('');
  const [serialNumberOfGoods, setSerialNumberOfGoods] = useState('');
  const [goodsType, setGoodsType] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [batchId, setBatchId] = useState('');
  const [shipmentNumberError, setShipmentNumberError] = useState('');
  const [shipmentDescription, setShipmentDescription] = useState('');
  const [containerNumberError, setContainerNumberError] = useState("");
  const [routeNameError, setRouteNameError] = useState("");
  const [deviceIdError, setDeviceIdError] = useState("");
  const [poNumberError, setPoNumberError] = useState("");
  const [ndcNumberError, setNdcNumberError] = useState("");
  const [serialNumberOfGoodsError, setSerialNumberOfGoodsError] = useState("");
  const [goodsTypeError, setGoodsTypeError] = useState("");
  const [expectedDeliveryDateError, setExpectedDeliveryDateError] = useState("");
  const [deliveryNumberError, setDeliveryNumberError] = useState("");
  const [batchIdError, setBatchIdError] = useState("");
  const [shipmentDescriptionError, setShipmentDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName,setUserName]=useState('')
  const [userEmail,setUserEmail]=useState('')
  const [userNameError,setUserNameError]=useState('')
  const [allUsers,setAllUsers]=useState([]);
  const [userData,setUserData]=useState([])
  useEffect(()=>{
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
      setUserData(matchedUser)
      
    }
    const isAuthenticated =AuthFunction();
  if (!isAuthenticated) {
    navigate('/login');
  } else {
    checkTokenValidity();
    setUserNameToState();
    getAllUsers();
  }
  },[])
 function setUserNameToState(){
    const userEmail=localStorage.getItem('UserName');
    console.log(userEmail);
    setUserName(userEmail);
  }

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "shipmentNumber":
        setShipmentNumber(value);
        setShipmentNumberError(value.trim() ? '' : 'Shipment Number is required.');
        break;
      case "containerNumber":
        setContainerNumber(value);
        setContainerNumberError(value.trim() ? '' : 'Container Number is required.');
        break;
      case "routeName":
        setRouteName(value);
        setRouteNameError(value.trim() ? '' : 'Route Name is required.');
        break;
      case "deviceId":
        setDeviceId(value);
        setDeviceIdError(value.trim() ? '' : 'Device Id is required.');
        break;
      case "poNumber":
        setPoNumber(value);
        setPoNumberError(value.trim() ? '' : 'PO Number is required.');
        break;
      case "ndcNumber":
        setNdcNumber(value);
        setNdcNumberError(value.trim() ? '' : 'NDC Number is required.');
        break;
      case "serialNumberOfGoods":
        setSerialNumberOfGoods(value);
        setSerialNumberOfGoodsError(value.trim() ? '' : 'Serial Number of Goods is required.');
        break;
      case "goodsType":
        setGoodsType(value);
        setGoodsTypeError(value.trim() ? '' : 'Goods Type is required.');
        break;
      case "expectedDeliveryDate":
        setExpectedDeliveryDate(value);
        setExpectedDeliveryDateError(value.trim() ? '' : 'Expected Delivery Date is required.');
        break;
      case "deliveryNumber":
        setDeliveryNumber(value);
        setDeliveryNumberError(value.trim() ? '' : 'Delivery Number is required.');
        break;
      case "batchId":
        setBatchId(value);
        setBatchIdError(value.trim() ? '' : 'Batch Id is required.');
        break;
      case "shipmentDescription":
        setShipmentDescription(value);
        setShipmentDescriptionError(value.trim() ? '' : 'Shipment Description is required.');
        break;
        case "userEmail":
          setUserEmail(value)
          setUserNameError(value.trim() ? '' : 'User Email Is Required.');
          break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShipmentNumberError("");
    setContainerNumberError("");
    setRouteNameError("");
    setDeviceIdError("");
    setPoNumberError("");
    setNdcNumberError("");
    setSerialNumberOfGoodsError("");
    setGoodsTypeError("");
    setExpectedDeliveryDateError("");
    setDeliveryNumberError("");
    setBatchIdError("");
    setShipmentDescriptionError("");
    if(userData.role=='Admin' && !userEmail.trim()){
      setUserNameError('User Name Is Required')
    }
    if (!shipmentNumber.trim()) {
      setShipmentNumberError("Shipment Number is required.");
      return;
     
    }

    // Validate containerNumber
    if (!containerNumber.trim()) {
      setContainerNumberError("Container Number is required.");
      return;
    }

    // Validate routeName
    if (!routeName.trim()) {
      setRouteNameError("Route Name is required.");
      return;
    }

    // Validate deviceId
    if (!deviceId.trim()) {
      setDeviceIdError("Device ID is required.");
      return;
    }

    // Validate poNumber
    if (!poNumber.trim()) {
      setPoNumberError("PO Number is required.");
      return;
    }

    // Validate ndcNumber
    if (!ndcNumber.trim()) {
      setNdcNumberError("NDC Number is required.");
      return;
    }

    // Validate serialNumberOfGoods
    if (!serialNumberOfGoods.trim()) {
      setSerialNumberOfGoodsError("Serial Number of Goods is required.");
      return;
    }

    // Validate goodsType
    if (!goodsType.trim()) {
      setGoodsTypeError("Goods Type is required.");
      return;
    }

    // Validate expectedDeliveryDate
    if (!expectedDeliveryDate.trim()) {
      setExpectedDeliveryDateError("Expected Delivery Date is required.");
      return;
    }

    // Validate deliveryNumber
    if (!deliveryNumber.trim()) {
      setDeliveryNumberError("Delivery Number is required.");
      return;
    }

    // Validate batchId
    if (!batchId.trim()) {
      setBatchIdError("Batch ID is required.");
      return;
    }

    // Validate shipmentDescription
    if (!shipmentDescription.trim()) {
      setShipmentDescriptionError("Shipment Description is required.");
      return;
    }
    setIsLoading(true)
   
    const userEmail1 = userData.role === 'Admin' ? userEmail : userName;
    const formData = {
      shipmentNumber: shipmentNumber,
      containerNumber: containerNumber,
      routeName: routeName,
      deviceId: deviceId,
      poNumber: poNumber,
      ndcNumber: ndcNumber,
      serialNumberOfGoods: serialNumberOfGoods,
      goodsType: goodsType,
      expectedDeliveryDate: expectedDeliveryDate,
      deliveryNumber: deliveryNumber,
      batchId: batchId,
      shipmentDescription: shipmentDescription,
      userEmail: userEmail1
    };
    // Add other form data fields as needed

    try {
      const response = await fetch('http://localhost:8080/new-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        const data = await response.text();

        setIsLoading(false)
        navigate('/myshipment')
        console.log('Success:', data);
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error);
    }


  }
  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" }}>
          <ToastContainer/>
      <Sidebar />
  
      <div className="newship">
        <div class="container">
          <h4 style={{ marginBottom: '30px' }}>Create Shipment</h4>
          <form onSubmit={handleSubmit}>
  <div class="row">
    <div class="col-sm">
    {userData && userData.role === "Admin" && (
  <div className="form-group w-100 mb-3" >
    <label htmlFor="userEmail">Select User Email*</label>
    <select  
  className="form-select"
  id="userEmail"
  name="userEmail"
  value={userEmail}
  onChange={handleChange}
>

  {allUsers.map((user) => (
    // Render option only if user is not an admin
    user.role === "User" && (
      <option  value={user.userEmail}>
        {user.userEmail}
      </option>
    )
  ))}
</select>


    {userNameError && (
      <p style={{ color: "red" }}>{userNameError}</p>
    )}
  </div>
)}

      <div class="form-group w-100 mb-3">
        <label for="exampleInputEmail1">Shipment Number*</label>
        <input type="number" class="form-control" id="exampleInputEmail1" name="shipmentNumber" value={shipmentNumber} onChange={handleChange} aria-describedby="emailHelp" placeholder="ShipmentNumber" />
        {shipmentNumberError && (
          <p style={{ color: "red" }}>{shipmentNumberError}</p>
        )}
      </div>
    
      <div class="form-group w-100 mb-3">
        <label for="sel1">Route Details*</label>
        <select class="form-select" name="routeName" onChange={handleChange}>
          <option selected>Select Route*</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
        </select>
        {routeNameError && (
          <p style={{ color: "red" }}>{routeNameError}</p>
        )}
      </div>

      <div class="form-group w-100 mb-3">
        <label for="sel1">Device*</label>
        <select class="form-select" name="deviceId" onChange={handleChange}>
          <option selected>Select Device Id</option>
          <option value="202348">202348</option>
          <option value="302442">302442</option>
          <option value="492849">492849</option>
        </select>
        {deviceIdError && (
          <p style={{ color: "red" }}>{deviceIdError}</p>
        )}
      </div>
 
      <div class="form-group w-100 mb-3">
        <label for="exampleInputPassword1">PO Number*</label>
        <input type="number" class="form-control" id="exampleInputPassword1" name="poNumber" value={poNumber} onChange={handleChange} placeholder="PO Number" />
        {poNumberError && (
          <p style={{ color: "red" }}>{poNumberError}</p>
        )}
      </div>

      <div class="form-group w-100 mb-3">
        <label for="exampleInputEmail1">NDC Number*</label>
        <input type="number" class="form-control" name="ndcNumber" value={ndcNumber} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="NDC Number" />
        {ndcNumberError && (
          <p style={{ color: "red" }}>{ndcNumberError}</p>
        )}
      </div>

      <div class="form-group w-100 mb-3">
        <label for="exampleInputPassword1">Serial Number of Goods*</label>
        <input type="number" class="form-control" id="exampleInputPassword1" name="serialNumberOfGoods" value={serialNumberOfGoods} onChange={handleChange} placeholder="Serial Number of Goods" />
        {serialNumberOfGoodsError && (
          <p style={{ color: "red" }}>{serialNumberOfGoodsError}</p>
        )}
      </div>
    </div>
    <div class="col-sm px-4">
 
      <div class="form-group w-100 mb-3">
        <label for="exampleInputEmail1">Container Number*</label>
        <input type="number" class="form-control" id="exampleInputEmail1" name="containerNumber" value={containerNumber} onChange={handleChange} aria-describedby="emailHelp" placeholder="Container Number" />
        {containerNumberError && (
          <p style={{ color: "red" }}>{containerNumberError}</p>
        )}
      </div>

      <div class="form-group w-100 mb-3">
        <label for="sel1">Goods Type*</label>
        <select class="form-select" name="goodsType" onChange={handleChange}>
          <option selected>Select Goods Type</option>
          <option value="Medicine">Medicine</option>
          <option value="Electronic Device">Electronic Device</option>
          <option value="Cars">Cars</option>
        </select>
        {goodsTypeError && (
          <p style={{ color: "red" }}>{goodsTypeError}</p>
        )}
      </div>
     
      <div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker w-100 mb-3" inline="true">
        <label for="example">Expected Delivery Date*</label>
        <input placeholder="Select date" type="date" id="example" class="form-control" name="expectedDeliveryDate" value={expectedDeliveryDate} onChange={handleChange} ></input>
        {expectedDeliveryDateError && (
          <p style={{ color: "red" }}>{expectedDeliveryDateError}</p>
        )}
        <i class="fas fa-calendar input-prefix"></i>
      </div>
 
      <div class="form-group w-100 mb-3">
        <label for="exampleInputPassword1">Delivery Number*</label>
        <input type="password" class="form-control" id="exampleInputPassword1" name="deliveryNumber" value={deliveryNumber} onChange={handleChange} placeholder="Delivery NUmber" />
        {deliveryNumberError && (
          <p style={{ color: "red" }}>{deliveryNumberError}</p>
        )}
      </div>
 
      <div class="form-group w-100 mb-3">
        <label for="exampleInputPassword1">Batch Id*</label>
        <input type="password" class="form-control" id="exampleInputPassword1" name="batchId" value={batchId} onChange={handleChange} placeholder="Batch Id" />
        {batchIdError && (
          <p style={{ color: "red" }}>{batchIdError}</p>
        )}
      </div>
 
      <div class="form-group purple-border">
        <label for="exampleFormControlTextarea4">Shipment Description*</label>
        <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" name="shipmentDescription" value={shipmentDescription} onChange={handleChange}></textarea>
        {shipmentDescriptionError && (
          <p style={{ color: "red" }}>{shipmentDescriptionError}</p>
        )}
      </div>
    </div>
  </div>
  <div className="row justify-content-center mt-4">
    <div className="col-md-6 text-center mb-2">
      <button type="submit" className="btn btn-outline-primary btn-lg w-100 ">
        {isLoading && (
          <div className="loader-container">
            <div className="circular-loader"></div>
          </div>
        )}
        <div className="button-content">
          {!isLoading ? "Create Shipment" : ""}
        </div>
      </button>
    </div>
    <div className="col-md-6 text-center mb-2">
      <button type="button" className="btn btn-outline-success btn-lg w-100">
        Clear Details
      </button>
    </div>
  </div>
</form>

        </div>
      </div>
    </div>
  );
};

export default NewShipment;
