import React, { useState } from "react";
import "../Login/Login.css";
import Logo from "../../assets/Exf.jpeg";
import ExfLogo from "../../assets/Exf.jpeg";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmshowPassword] = useState(false);
  const [isCheckboxAccepted, setIsCheckboxAccepted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Update the selected role state
  };
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setConfirmshowPassword(!confirmshowPassword);
    }
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

  const handleSubmit = async (e) => {
    
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    // Validate username
    if (!username.trim()) {
      setUsernameError("Username is required.");
    }

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required.");
    } else if (!isSecurePassword(password)) {
      setPasswordError(
        "Password should be at least 8 characters, include both uppercase and lowercase letters, and have at least one number or special character."
      );
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required.");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    }
    if (!isCheckboxAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // If there are no errors, perform signup logic
    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      // Perform signup logic (e.g., API request)
      console.log("Signup successful!");
      try {
        const formData={
          userName:username,
          userEmail:email,
          userPassword:password,
          role:selectedRole
  
        }
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        console.log(response)
  if(response.status==200){
    navigate('/login')
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setIsCheckboxAccepted(false);
  }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }

    }
  };
  const handleCheckboxChange = () => {
    setIsCheckboxAccepted(!isCheckboxAccepted);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Validate username
    if (!value.trim()) {
      setUsernameError('Username is required.');
    } else {
      setUsernameError('');
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate username
    if (!value.trim()) {
      setEmailError('Email is required.');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate confirm password
    if (!value.trim()) {
      setPasswordError('Password is required.');
    } else {
      setPasswordError('');
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Validate confirm password
    if (!value.trim()) {
      setConfirmPasswordError('Confirm Password is required.');
    } else {
      setConfirmPasswordError('');
    }
  };
  return (
    <section
      class="h-100 gradient-form"
      style={{ backgroundColor: "#eee;", overflow: "auto" }}
    >
      <div class="container py-5 ">
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
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>SIGNUP</p>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example11">
                          UserName
                        </label>
                        <input
                          type="name"
                          id="form2Example11"
                          class="form-control"
                          placeholder="Enter Your Full Name"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        {usernameError && (
                          <p style={{ color: "red" }}>{usernameError}</p>
                        )}
                      </div>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example11">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form2Example11"
                          class="form-control"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={handleEmailChange}
                        />

                        {emailError && (
                          <p style={{ color: "red" }}>{emailError}</p>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example22">
                          Password
                        </label>
                        <input

                          type={showPassword ? "password" : "text"}
                          id="form2Example22"
                          class="form-control"
                          placeholder="Enter new Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <span
                          onClick={() => {
                            handleTogglePassword("password");
                          }}
                          style={!passwordError ? { position: "absolute", top: "56%", right: "7%", transform: "translate(-50%, -50%)" } : { position: "absolute", top: "54%", right: "7%", transform: "translate(-50%, -50%)" }}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </span>
                        {passwordError && (
                          <p style={{ color: "red", marginTop: "0.5rem" }}>{passwordError}</p>
                        )}
                      </div>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example22">
                          Confirm Password
                        </label>
                        <input
                          type={confirmshowPassword ? "password" : "text"}
                          id="form2Example22"
                          class="form-control"
                          placeholder="Confirm new Password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        <span
                          onClick={() => {
                            handleTogglePassword("confirmPassword");
                          }}
                          style={!confirmPasswordError ? { position: "absolute", top: "69%", right: "7%", transform: "translate(-50%, -50%)" } : { position: "absolute", top: "69%", right: "7%", transform: "translate(-50%, -50%)" }}
                        >
                          {confirmshowPassword ? "🙈" : "👁️"}
                        </span>
                        {confirmPasswordError && (
                          <p style={{ color: "red" }}>{confirmPasswordError}</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>Are you ? </p>
                        <div className="form-check form-check-inline" style={{ marginLeft: '10px' }}>
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="User"
          checked={selectedRole === 'User'} // Check if selectedRole is 'User'
          onChange={handleRoleChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          User
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input big"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="Admin"
          checked={selectedRole === 'Admin'} // Check if selectedRole is 'Admin'
          onChange={handleRoleChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Admin
        </label>
      </div>
                      </div>


                      <div className="col-md-12 mx-auto">
                        <div
                          className="text-center"
                          style={{ marginBottom: "10px" }}
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={isCheckboxAccepted}
                              onChange={handleCheckboxChange}
                            />{" "}
                            {/* Checkbox */}
                            <span style={{ fontSize: "15px" }}>
                              I have read and accept the Policy and Conditions
                              of law
                            </span>
                          </label>
                        </div>
                        <div className="text-center pt-1 pb-1">
                        <button type="submit" className="btn btn-outline-primary btn-lg w-100 position-relative">
      {isLoading && (
        <div className="loader-container">
          <div className="circular-loader"></div>
        </div>
      )}
      <div className="button-content">
        {!isLoading ? "Sign-UP" : ""}
      </div>
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

export default Signup;
