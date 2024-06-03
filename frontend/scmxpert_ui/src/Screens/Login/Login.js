import React, { useEffect, useState } from "react";
import "./Login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import ExfLogo from "../../assets/Exf.jpeg";
import  SCMLOG from "../../assets/scm.jpg"
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import user from '../../assets/User.jpg'
import { ToastContainer,toast } from 'react-toastify';
import { KeyData } from "../../ENDPOINTS/EndPoint";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [errorMessage,setErrorMessage]=useState("")
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    console.log(KeyData)
  })
  const handleRecaptchaChange = (value) => {

   if(value)
   {
    setIsCaptchaValid(true);
   }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isSecurePassword = (password) => {
    // Password should have at least 8 characters, include both uppercase and lowercase letters,
    // and include at least one number or special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    // Perform validations
    if (!username.trim()) {
      setUsernameError("Username is required.");
    } else if (!isValidEmail(username)) {
      setUsernameError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    } 
    if(!isCaptchaValid){
     alert('Please Valid Captcha');
     return;
    }
    else{
      try {
        setIsLoading(true)
        let userData={
          userEmail:username,
          userPassword:password
        }
        const response = await fetch(`${KeyData.api_end_point}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
       
        if (response.status==200){
        const token=await response.text();
        localStorage.setItem('TokenValue',token);
        localStorage.setItem('UserName',username)
        setIsLoading(false);
        navigate('/architecture');
        } else if(response.status==401){
          setIsLoading(false);
          const errorMessage=await response.text();
          setErrorMessage(errorMessage);
        }
    } catch (error) {
        setErrorMessage(error.message)
        setIsLoading(false);
        console.error('Network error:', error);
        // toast.error("Something Went Wrong", { toastId: 'success1' });
    }
    }
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!value.trim()) {
      setUsernameError("Email is required.");
    } else {
      setUsernameError("");
    }
  };
  const handlePasswordChange = (e) => {
  setErrorMessage('')
    const value = e.target.value;
    setPassword(value);

    // Validate confirm password
    if (!value.trim()) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };
  function NavigateUser(path) {
    navigate(`/${path}`);
  }
  return (
    <section
      class="h-100 gradient-form "
      style={{  background: "#B5C18E", overflow: "auto" }}
    >
          <ToastContainer/>
      <div class="container-fluid py-4 h-100 mb-4">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card  text-black">
              <div class="row g-0">
                <div class="col-lg-6  d-flex align-items-center hello"></div>
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">
                    <div class="text-center">
                      <img
                        src={SCMLOG}
                        alt="Girl in a jacket"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <h3 style={{ fontFamily: "Fantasy" }}>SCMXPertLite</h3>
                      {errorMessage && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
                    </div>
                    <form>
                      <p>Please login to your account</p>

                      <div class="form-outline mb-4">
                        <MdOutlineMailOutline />
                        <label
                          class="form-label"
                          for="form2Example11"
                          style={{ marginLeft: "5px" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="form2Example11"
                          class="form-control"
                          placeholder="Email"
                          value={username}
                          onChange={handleUsernameChange}
                          autoComplete="off"
                        />
                        {usernameError && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {usernameError}
                          </p>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <RiLockPasswordFill />
                        <label
                          class="form-label"
                          for="form2Example22"
                          style={{ marginLeft: "5px" }}
                        >
                          Password
                        </label>
                       
                        <input
                          type={!showPassword ? "password" : "text"}
                          id="form2Example22"
                          class="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          autoComplete="off"
                        />
           
                        <span
                          onClick={()=>{handleTogglePassword()}}
                          className="EyeIcon"
                        >
                          {showPassword ? "🫣" : "👁️"}
                        </span>
                    
                    
                      </div>
                      {passwordError && (
    <p style={{ color: "red" }}>
        {passwordError}
    </p>
    )}

                      <div style={{marginTop:'12px',display:'flex',justifyContent:'center'}}>
                       <ReCAPTCHA alt="Refresh"
                          sitekey={KeyData.google_api_key}
                          onChange={handleRecaptchaChange}
                        />
                       </div>
                      <div className="col-md-12 mx-auto">
                        <div className="text-center pt-1 pb-1">

                        <button  onClick={()=>{
                          handleLogin()
                        }} className="btn btn-primary btn-block w-50 position-relative gradient-custom-2 mb-2" type="button">
        {isLoading && (
          <div className="loader-container">
                                          <div className="loaderforlogin">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
          </div>
        )}
        <div className="button-content">
          {!isLoading ? "Login" : ""}
        </div>
      </button>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() => {
                              NavigateUser("signup");
                            }}
                          >
                            Create new
                          </button>
                        </div>
                        <div
                          className="text-center"
                          style={{ marginBottom: "10px" }}
                        >
                          <button
                            className="text-muted"
                            style={{ border: "none", background: "none" }}
                            onClick={() => {
                              NavigateUser("forgotpassword");
                            }}
                          >
                            Forgot Your password?
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
  );
};

export default Login;
