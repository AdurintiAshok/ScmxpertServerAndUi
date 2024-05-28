import React, { useState } from "react";
import "./DataStream.css";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import AuthFunction from "../../Auth/Auth";
import { KeyData } from "../../ENDPOINTS/EndPoint";
import { LuSmilePlus } from "react-icons/lu";
import { FaRegSadCry } from "react-icons/fa";
const DataStream = () => {
  const [shipments, setShipMents] = React.useState([]);
  const navigate = useNavigate();
  const [deviceId, setDeviceId] = useState(0)
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState([])
  const [deviceIds, setDeviceIds] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [loader,setLoader]=useState(false);
 
  React.useEffect(() => {
    async function fetchShipments(dataPass) {
 
      console.log("dataPass", dataPass)
      const token = localStorage.getItem('TokenValue')
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
      if (matchedUser.role == "User") {
        navigate('*')
      }
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

  }, [filteredOptions])

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('TokenValue');
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
        navigate('/login')
        // Perform logout action here, such as clearing local storage, redirecting to login page, etc.
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visiblePages] = useState(3);

  const totalShipments = filteredOptions.length > 0 ? filteredOptions.length : sensorData.length;
  const totalPages = Math.ceil(totalShipments / itemsPerPage);

  // Determine which set of items to display based on whether there are filtered options
  const itemsToDisplay = filteredOptions.length > 0 ? filteredOptions : sensorData;

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
        <li key="ellipsis-start" className="page-item">
          <span className="page-link" onClick={() => handlePaginationClick(1)}>1</span>
        </li>
      );
      pages.push(
        <li key="ellipsis-start-dot" className="page-item">
          <span className="page-link disabled">...</span>
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
        <li key="ellipsis-end-dot" className="page-item">
          <span className="page-link disabled">...</span>
        </li>
      );
      pages.push(
        <li key="ellipsis-end" className="page-item">
          <span className="page-link" onClick={() => handlePaginationClick(totalPages)}>{totalPages}</span>
        </li>
      );
    }

    return pages;
  };
  const onDeviceIdSelection = () => {
    console.log(filteredOptions.length)
    const filterResult = sensorData.filter((item) => {
      return item.device_ID == deviceId;
    });
    console.log(filterResult)
    setFilteredOptions(filterResult);
  }
  const renderTableRows = (currentItems) => {
    return  currentItems.map((sensorData, index) => (
      <tr key={index}>

        <td className="px-4 py-3">{sensorData.battery_Level}</td>
        <td className="px-4 py-3">{sensorData.device_ID}</td>
        <td className="px-4 py-3">{sensorData.first_Sensor_temperature}</td>
        <td className="px-4 py-3">{sensorData.route_From}</td>
        <td className="px-4 py-3">{sensorData.route_To}</td>
        <td className="px-4 py-3">{sensorData.timestamp}</td>


      </tr>
    ));
  };

  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%", width: '100%' }}>
      <Sidebar />
      <div>

        <div class="container" style={{ marginTop: '2%' }}>

          {userData && userData.role == 'Admin' && sensorData.length>0 
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

                      <button type="button" className="btn btn-outline-success btn-lg" onClick={() => { onDeviceIdSelection() }}>Get Device Data</button>
                    </div>
                  </div>
                </div>
                {!sensorData.length > 0 ? (
                  <div className="loader-container">
                                    <div className="loaderforstream">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
                  </div>
                ) : (
                  <div className="row dataship" style={{ maxHeight: '620px', overflow: 'auto' }}>
                    <table className="table table-striped mb-2">
                      <thead>
                        <tr className="">
                          {/* <th className="px-4 py-3">S.NO</th> */}

                          <th className="py-3">Battery Level</th>
                          <th className="py-3">Device ID</th>
                          <th className="py-3">Sensor Temperature</th>
                          <th className="px-4 py-3">Route From</th>
                          <th className="px-4 py-3">Route To</th>
                          <th className="px-4 py-3">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableRows(currentItems)}
                      </tbody>
                    </table>
                    <div className="row">
                    <div>
 
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
    </div>
                </div>
                  </div>
                  
                )}

              </form>
            ) : (
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
            ) :(  <div className="loader-container">
<p>No Data Available for Streaming <FaRegSadCry size={23} /></p>
            </div>)
          }
          </>
            )}
        </div>

      </div>

    </div>
  );
};

export default DataStream;
