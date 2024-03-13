import React, { useState } from "react";
import "../DataStream/DataStream.css";
import Sidebar from "../../Components/Sidebar";
const DataStream = () => {
  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" }}>
      <Sidebar />
<div className="myship">
<div class="container" style={{marginTop:'2%',}}>
      <form>
      <div className="row mb-4" style={{ background: '#f3eae8', padding: '30px' }}>
      <h4>Please Select a Device Id to see the Data Stream</h4>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Example select</label>
        <div className="d-flex flex-column">
          <select className="form-control form-select mb-2" id="exampleFormControlSelect1">
            <option selected>Select Device ID</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button type="button" className="btn btn-outline-success btn-lg">Get Device Data</button>
        </div>
      </div>
    </div>
  <div class="row">
  <table class="table table-striped mb-0 pt-5">
        <thead>
            <tr>
                <th scope="col" class="px-4 py-3">Class name</th>
                <th scope="col" class="px-4 py-3">Type</th>
                <th scope="col" class="px-4 py-3">Hours</th>
                <th scope="col" class="px-4 py-3">Trainer</th>
                <th scope="col" class="px-4 py-3">Spots</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="px-4 py-3">Virtual Cycle</td>
                <td class="px-4 py-3">Gym</td>
                <td class="px-4 py-3">8:00 AM - 9:00 AM</td>
                <td class="px-4 py-3">Randy Porter</td>
                <td class="px-4 py-3">20</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
            <tr>
                <td class="px-4 py-3">Like a butterfly</td>
                <td class="px-4 py-3">Boxing</td>
                <td class="px-4 py-3">9:00 AM - 11:00 AM</td>
                <td class="px-4 py-3">Aaron Chapman</td>
                <td class="px-4 py-3">10</td>
            </tr>
        </tbody>
    </table>
  </div>
  </form>
</div>
</div>
    </div>
  );
};

export default DataStream;
