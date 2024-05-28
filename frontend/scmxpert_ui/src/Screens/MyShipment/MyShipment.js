import React, { useState } from "react";
import "../DataStream/DataStream.css";
import "./MyShipment.css"
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import AuthFunction from "../../Auth/Auth";
import { KeyData } from "../../ENDPOINTS/EndPoint";
import { LuSmilePlus } from "react-icons/lu";
const MyShipment = () => {
  const [shipments, setShipMents] = React.useState([]);
  const [deviceId, setDeviceId] = useState('')
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [shipmentNumberError, setShipmentNumberError] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState([])
  const [deviceIds, setDeviceIds] = useState([]);
  const [loader,setLoader]=useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchShipments(dataPass) {
      console.log("dataPass", dataPass)
      const token = localStorage.getItem('TokenValue')
      try {
        const response = await fetch(`${KeyData.api_end_point}/shipments`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
              // Replace yourAuthToken with the actual authentication token
            },
            body: JSON.stringify({
              userEmail: dataPass?.userEmail,
              role: dataPass?.role
            })
          });

        if (!response.ok) {
          navigate('/login')
        }
        const data = await response.json();
        const extractedDeviceIds = [...new Set(data.map(obj => obj.deviceId))];
        setDeviceIds(extractedDeviceIds);
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
    async function getAllUsers() {
      const token = localStorage.getItem('TokenValue')
      try {
        const response = await fetch(`${KeyData.api_end_point}/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
            // Replace yourAuthToken with the actual authentication token
          }
        });
        if (response.status == 200) {
          const data = await response.json();
          console.log("allUsers", data)
          setAllUsers(data);
          filterUsers(data);
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
      }
    }
    async function filterUsers(allUsers) {
      const userEmail = localStorage.getItem('UserName');
      console.log(userEmail)
      const matchedUser = allUsers.find(user => user.userEmail === userEmail);
      console.log("macthed", allUsers)
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
    setCurrentPage(1);
  }, [filteredOptions])
  const checkTokenValidity = async () => {
    const token = localStorage.getItem('TokenValue');
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

        console.log("Token is expired or not validated. Logging out...");
        toast.error("Token Has Expired Logging Out.........", { toastId: 'success1' });
        const timeoutId = setTimeout(() => {
          navigate('/login');
        }, 3000); // Timeout in milliseconds (3 seconds)

      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visiblePages] = useState(3);

  const totalShipments = filteredOptions.length > 0 ? filteredOptions.length : shipments.length;
  const totalPages = Math.ceil(totalShipments / itemsPerPage);

  // Determine which set of items to display based on whether there are filtered options
  const itemsToDisplay = filteredOptions.length > 0 ? filteredOptions : shipments;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const renderPaginationLinks = (totalPages, currentPage, handlePaginationClick) => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const half = Math.floor(visiblePages / 2);
      if (currentPage <= half) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + half >= totalPages) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - half;
        endPage = currentPage + half;
      }
    }

    if (startPage > 1) {
      pages.push(
        <li key="ellipsis-start" className="page-item disabled">
          <span className="page-link" onClick={() => handlePaginationClick(1)}>1</span>
        </li>
      );
      pages.push(
        <li key="ellipsis-start-dot" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <span className="page-link" onClick={() => handlePaginationClick(i)}>{i}</span>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li key="ellipsis-end-dot" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
      pages.push(
        <li key="ellipsis-end" className="page-item disabled">
          <span className="page-link" onClick={() => handlePaginationClick(totalPages)}>{totalPages}</span>
        </li>
      );
    }

    return pages;
  };

  const onDeviceIdSelection = () => {
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
        <td className="px-6 py-3">{shipment.shipmentDescription}</td>
      </tr>
    ));
  };

  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%", width: '100%' }} >
      <Sidebar />
      <div >
        <div class="container" style={{ marginTop: '2%' }}>
        {shipments.length > 0 ? (
          <form>
            <div className="row mb-4" style={{ background: '#f3eae8', padding: '30px' }}>
              <h4>Please Select a Device Id to see Your Shipments</h4>
              <div className="form-group">

                <div className="d-flex flex-column" >
                  <select
                    className="form-control form-select mb-2"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      setDeviceId(e.target.value);
                    }}

                  >
                    <option disabled={!deviceId} selected={!deviceId} >Select Device ID</option>
                    {deviceIds.map((id, index) => (
                      <option key={index} value={id}>{id}</option>
                    ))}
                  </select>
                  <button type="button" className="btn btn-outline-success btn-lg" onClick={() => { onDeviceIdSelection() }}>Get Device Data</button>
                </div>
              </div>
            </div>
            
              <>
              <div class="row tableship" >
                
                <div className="hii">
                <table className="table table-striped mb-2">
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
                      {renderTableRows(currentItems)}

                    </tbody>
                  </table>
                  </div>
              </div>
              <div className="row">
              <div className="pagination-container">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <span className="page-link" onClick={() => handlePaginationClick(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                          </span>
                        </li>
                        {renderPaginationLinks(totalPages, currentPage, handlePaginationClick)}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <span className="page-link" onClick={() => handlePaginationClick(currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </>
          
            
          </form>
        ):(
           <>
           {
            !loader ?
             (
              <div className="loader-container">
              <div className="loaderforstream">
<div className="dot"></div>
<div className="dot"></div>
<div className="dot"></div>
</div>
</div>
             ) :(      <div className="loader-container">
             <p>No Data Available for this User Create a shipment now <LuSmilePlus size={20} color="green"  onClick={()=>{navigate('/newshipment')}} style={{cursor: "pointer"}}/></p>
             </div>)
           }
           </>
          
        )}
        </div>
      </div>
    </div>
  );
};

export default MyShipment;
