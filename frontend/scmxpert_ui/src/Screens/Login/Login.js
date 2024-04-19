import React, { useState } from "react";
import "./Login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import ExfLogo from "../../assets/Exf.jpeg";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import user from '../../assets/User.jpg'
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
    // Clear previous error messages
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
        let userData={
          userEmail:username,
          userPassword:password
        }
        const response = await fetch('http://localhost:8080/login', {
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
        navigate('/newshipment')
        } else if(response.status==401){
          const errorMessage=await response.text();
          setErrorMessage(errorMessage);
        }
    } catch (error) {
        // Handle network error
        console.error('Network error:', error);
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
      style={{  background: "#E4E9F7", overflow: "auto" }}
    >
      <div class="container-fluid py-4 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card  text-black">
              <div class="row g-0">
                <div class="col-lg-6  d-flex align-items-center hello"></div>
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">
                    <div class="text-center">
                      <img
                        src={ExfLogo}
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
                          type={showPassword ? "password" : "text"}
                          id="form2Example22"
                          class="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <span
                          onClick={handleTogglePassword}
                          className="EyeIcon"
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </span>
                        {passwordError && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {passwordError}
                          </p>
                        )}
                       <div style={{marginTop:'10px',display:'flex',justifyContent:'center'}}>
                       <ReCAPTCHA
                          sitekey="6LdLllgpAAAAAMexecY2HM1tlocPTGTpXTvWu8fc"
                          onChange={handleRecaptchaChange}
                        />
                       </div>
                      </div>

                      <div className="col-md-12 mx-auto">
                        <div className="text-center pt-1 pb-1">
                        
                          <button  className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={() => {
                              handleLogin();
                            }}>
      {isLoading && (
        <div className="loader-container">
          <div className="circular-loader"></div>
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
