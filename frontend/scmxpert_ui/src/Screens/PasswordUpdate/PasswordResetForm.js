import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExfLogo from '../../assets/Exf.jpeg'
import user from '../../assets/transport.jpg'
import './PasswordResetForm.css'
import { KeyData } from '../../ENDPOINTS/EndPoint';
const PasswordResetForm = () => {
    const navigate=useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [ConfirmnewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(newPassword!==ConfirmnewPassword){
      alert("Password Is Not Matched with newPassword");
      return;
    }

    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch(`${KeyData.api_end_point}/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const message=await response.text();
      console.log(message)
      if (response.ok) {
        setSuccess(true);
        setError('');
        setIsLoading(false);
        navigate('/login')
      } else {
        setError('Failed to reset password');
        setSuccess(false);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to reset password');
      setSuccess(false);
      setIsLoading(false);
    }
  };


  return (
    <div style={{ overflowX: "hidden", background: "#E4E9F7", height: "100%" }}>
    <section class=" p-3 p-md-4 p-xl-5 ">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-xxl-11">
            <div class="card border-light-subtle shadow-sm">
              <div class="row g-0">
                <div class="col-12 col-md-6">
                  <img class="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={user} alt="Welcome back you've been missed!"/>
                </div>
                <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div class="col-12 col-lg-11 col-xl-10">
                    <div class="card-body p-3 p-md-4 p-xl-5">
                      <div class="row">
                        <div class="col-12">
                          <div class="mb-5">
                            <div class="text-center mb-4">
                              <a href="#!">
                              <img src={ExfLogo} alt="Girl in a jacket" style={{width:"40px",height:"40px"}}/> <h3 style={{fontFamily:'Fantasy'}}>SCMXPertLite</h3>
                              </a>
                            </div>
                            <h2 class="h4 text-center">Update Password</h2>
                            {/* <h3 class="fs-6 fw-normal text-secondary text-center m-0">Update the password you want.</h3> */}
                          </div>
                        </div>
                      </div>
                      <form onSubmit={changePassword}>
                        <div class="row gy-3 overflow-hidden">
                          <div class="col-12">
                            <div class="form-floating mb-3">
                              <input type="text" class="form-control" name="password" id="password" placeholder="Update Password" onChange={(e)=>{
setNewPassword(e.target.value)
                              }} required/>
                              <label for="email" class="form-label">Update Password</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input type="text" class="form-control" name="password" id="password" placeholder="Update Password" onChange={(e)=>{
setConfirmNewPassword(e.target.value)
                              }} required/>
                              <label for="email" class="form-label" >Update Confirm Password</label>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                            <button className="btn btn-outline-primary btn-lg w-100 position-relative" type='submit'>
        {isLoading && (
          <div className="loader-container">
            <div className="circular-loader"></div>
          </div>
        )}
        <div className="button-content">
          {!isLoading ? "Update Password" : ""}
        </div>
      </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div class="row">
                        <div class="col-12">
                          <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <a href="#!" class="link-secondary text-decoration-none" onClick={()=>{
                                navigate('/login')
                            }}>Login</a>
                            <a href="#!" class="link-secondary text-decoration-none"  onClick={()=>{
                                navigate('/signup')
                            }}>Register</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default PasswordResetForm;