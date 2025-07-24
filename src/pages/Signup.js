import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css'; // Reusing the same CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Must be at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("Requires uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Requires lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("Requires number");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("Requires special character");
    return errors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      M.toast({ html: "Invalid email address", classes: "rounded red" });
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      M.toast({ 
        html: `Password requirements:<br>• ${passwordErrors.join("<br>• ")}`, 
        classes: "rounded red" 
      });
      return;
    }

    if (password !== confirmPassword) {
      M.toast({ html: "Passwords don't match", classes: "rounded red" });
      return;
    }

    registerUser();
  };

  const registerUser = () => {
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        M.toast({ html: data.result, classes: 'rounded green' });
        navigate("/login");
      } else {
        M.toast({ html: data.error, classes: 'rounded red' });
      }
    })
    .catch(err => {
      M.toast({ html: "Registration failed", classes: 'rounded red' });
      console.error("Error:", err);
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Create Account</h2>
        
        <form onSubmit={handleSignup} className="login-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your  name"
              required
            />
          </div>

        

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                required
              />
              <span 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
              <span 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>

          <div className="password-requirements">
            <p>Password must contain:</p>
            <ul>
              <li className={password.length >= 8 ? 'valid' : ''}>8+ characters</li>
              <li className={/[A-Z]/.test(password) ? 'valid' : ''}>Uppercase letter</li>
              <li className={/[a-z]/.test(password) ? 'valid' : ''}>Lowercase letter</li>
              <li className={/[0-9]/.test(password) ? 'valid' : ''}>Number</li>
              <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : ''}>Special character</li>
            </ul>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Sign Up
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login" className="signup-text">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
