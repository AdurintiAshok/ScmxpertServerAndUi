import React, { useState } from "react";
import "../NewShipment/NewShipment.css";
import Sidebar from "../../Components/Sidebar";
const NewShipment = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    console.log(event.target.value)
    setSelectedDate(event.target.value);
  };
  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" }}>
      <Sidebar />
      <div className="newship">
      <div class="container">
      <h4 style={{marginBottom:'30px'}}>Create Shipment</h4>
      <form>
  <div class="row ">
    <div class="col-sm">
  <div class="form-group w-100 mb-3">
    <label for="exampleInputEmail1">Shipment Number*</label>
    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ShipmentNumber"/>

  </div>
  <div class="form-group w-100 mb-3">
  <label for="sel1">Route Details*</label>
      <select class="form-select">
        <option selected>Select Route*</option>
        <option>Hyderabad</option>
        <option>Chennai</option>
        <option>Mumbai</option>
      </select>
    </div>
    <div class="form-group w-100 mb-3">
  <label for="sel1">Device*</label>
      <select class="form-select">
        <option selected>Select Device Id</option>
        <option>202348</option>
        <option>302442</option>
        <option>492849</option>
      </select>
    </div>
  <div class="form-group w-100 mb-3">
    <label for="exampleInputPassword1">PO Number*</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="PO Number"/>
  </div>
  <div class="form-group w-100 mb-3">
    <label for="exampleInputEmail1">NDC Number*</label>
    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="NDC Number"/>

  </div>
  <div class="form-group w-100 mb-3">
    <label for="exampleInputPassword1">Serial Number of Goods*</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Serial Number of Goods"/>
  </div>

    </div>
    <div class="col-sm px-4">
    <div class="form-group w-100 mb-3">
    <label for="exampleInputEmail1">Container Number*</label>
    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Container Number"/>
  </div>
  <div class="form-group w-100 mb-3">
  <label for="sel1">Goods Type*</label>
      <select class="form-select">
        <option selected>Select Goods Type</option>
        <option>Medicine</option>
        <option>Electronic Device</option>
        <option>Cars</option>
      </select>
    </div>
    <div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker w-100 mb-3" inline="true">
    <label for="example">Expected Delivery Date*</label>
  <input placeholder="Select date" type="date" id="example" class="form-control"   value={selectedDate || ''} // If selectedDate is null, it defaults to an empty string
        onChange={handleDateChange} />
  <i class="fas fa-calendar input-prefix"></i>
</div>

    <div class="form-group w-100 mb-3">
    <label for="exampleInputPassword1">Delivery Number*</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Delivery NUmber"/>
  </div>
  <div class="form-group w-100 mb-3">
    <label for="exampleInputPassword1">Batch Id*</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Batch Id"/>
  </div>
  <div class="form-group purple-border">
  <label for="exampleFormControlTextarea4">Shipment Description*</label>
  <textarea class="form-control" id="exampleFormControlTextarea4" rows="3"></textarea>
</div>

    </div>
  </div>
  <div className="row justify-content-center mt-4">
      <div className="col-md-6 text-center mb-2">
        <button type="button" className="btn btn-outline-primary btn-lg w-100">
          Create Shipment
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
