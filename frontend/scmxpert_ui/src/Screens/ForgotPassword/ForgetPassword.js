import React,{useState}from 'react'
import "../Login/Login.css";
import { Button } from 'bootstrap';
import ExfLogo from '../../assets/Exf.jpeg'
const ForgetPassword = (params) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!value.trim()) {
      setUsernameError('Email is required.');
    } else {
      setUsernameError('');
    }
  };
  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const resetPassword=()=>{
    setUsernameError('');
    if (!username.trim()) {
      setUsernameError('Email is required.');
    } else if (!isValidEmail(username)) {
      setUsernameError('Please enter a valid email address.');
    }
    if (!usernameError) {
      setUsername('');
      console.log('ResetPassword successful!');
    }
  }
  return (

<section
      class="h-100 gradient-form"
      style={{ backgroundColor: "#eee;" }}
    >
      <div class="container py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card  text-black">
              <div class="row g-0">
                <div class="col-lg-6  d-flex align-items-center hello"></div>
                <div class="col-lg-6">
    <div class="card-body p-md-5 mx-md-4">
      <div class="text-center">
      <img src={ExfLogo} alt="Girl in a jacket" style={{width:"40px",height:"40px"}}/> <h3 style={{fontFamily:'Fantasy'}}>SCMXPertLite</h3>
      </div>
      <form>
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example11">
            Email
          </label>
          <input
            type="email"
            id="form2Example11"
            class="form-control"
            placeholder="Email"
            value={username}
            onChange={handleUsernameChange}
          />
                                  {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <div className="col-md-6 mx-auto">
          <div className="text-center pt-1 pb-1">
            <button
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
              type="button"
              onClick={()=>{resetPassword()}}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgetPassword
