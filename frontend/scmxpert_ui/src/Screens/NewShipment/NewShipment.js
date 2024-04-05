import React, { useState } from "react";
import "../NewShipment/NewShipment.css";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
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
  const [shipmentDescription, setShipmentDescription] = useState('');


  const [isLoading, setIsLoading] = useState(false);
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
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
      shipmentDescription: shipmentDescription
    }
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
        console.log(response)
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
      <Sidebar />

      <div className="newship">
        <div class="container">
          <h4 style={{ marginBottom: '30px' }}>Create Shipment</h4>
          <form onSubmit={handleSubmit}>
            <div class="row ">
              <div class="col-sm">
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputEmail1">Shipment Number*</label>
                  <input type="number" class="form-control" id="exampleInputEmail1" value={shipmentNumber} onChange={(e) => setShipmentNumber(e.target.value)} aria-describedby="emailHelp" placeholder="ShipmentNumber" />

                </div>
                <div class="form-group w-100 mb-3">
                  <label for="sel1">Route Details*</label>
                  <select class="form-select" onChange={(e) => setRouteName(e.target.value)} >
                    <option selected>Select Route*</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div class="form-group w-100 mb-3">
                  <label for="sel1">Device*</label>
                  <select class="form-select" onChange={(e) => setDeviceId(e.target.value)}>
                    <option selected >Select Device Id</option>
                    <option value="202348">202348</option>
                    <option value="302442">302442</option>
                    <option value="492849">492849</option>
                  </select>
                </div>
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputPassword1">PO Number*</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} placeholder="PO Number" />
                </div>
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputEmail1">NDC Number*</label>
                  <input type="number" class="form-control" value={ndcNumber} onChange={(e) => setNdcNumber(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="NDC Number" />

                </div>
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputPassword1">Serial Number of Goods*</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Serial Number of Goods" value={serialNumberOfGoods} onChange={(e) => setSerialNumberOfGoods(e.target.value)} />
                </div>

              </div>
              <div class="col-sm px-4">
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputEmail1">Container Number*</label>
                  <input type="number" class="form-control" id="exampleInputEmail1" value={containerNumber} onChange={(e) => setContainerNumber(e.target.value)} aria-describedby="emailHelp" placeholder="Container Number" />
                </div>
                <div class="form-group w-100 mb-3">
                  <label for="sel1">Goods Type*</label>
                  <select class="form-select" onChange={(e) => setGoodsType(e.target.value)}>
                    <option selected>Select Goods Type</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Electronic Device">Electronic Device</option>
                    <option value="Cars">Cars</option>
                  </select>
                </div>
                <div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker w-100 mb-3" inline="true">
                  <label for="example">Expected Delivery Date*</label>
                  <input placeholder="Select date" type="date" id="example" class="form-control" value={expectedDeliveryDate} onChange={(e) => setExpectedDeliveryDate(e.target.value)} ></input>
                  <i class="fas fa-calendar input-prefix"></i>
                </div>

                <div class="form-group w-100 mb-3">
                  <label for="exampleInputPassword1">Delivery Number*</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Delivery NUmber" value={deliveryNumber} onChange={(e) => setDeliveryNumber(e.target.value)} />
                </div>
                <div class="form-group w-100 mb-3">
                  <label for="exampleInputPassword1">Batch Id*</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" value={batchId} onChange={(e) => setBatchId(e.target.value)} placeholder="Batch Id" />
                </div>
                <div class="form-group purple-border">
                  <label for="exampleFormControlTextarea4">Shipment Description*</label>
                  <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" value={shipmentDescription} onChange={(e) => setShipmentDescription(e.target.value)}></textarea>
                </div>

              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-md-6 text-center mb-2">
                <button type="submit" className="btn btn-outline-primary btn-lg w-100 position-relative">
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
