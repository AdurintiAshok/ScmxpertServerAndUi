import React,{useState}from 'react'
import ExfLogo from '../../assets/exf-png.png'
import './MyAccount.css'
import { IoIosClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Metrics from '../Metrics/Metrics';
import Sidebar from '../../Components/Sidebar';
import User from '../../assets/User.jpg'
const MyAccount = () => {
    
  return (
    <div style={{overflowX:'hidden',background:'#E4E9F7',height:'100%'}}>
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
                <h5 className="mb-1">Ashok Adurinti</h5>
                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                  ashok@gmail.com
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
