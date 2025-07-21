import { useState } from "react";
import { data, Link,useNavigate } from "react-router-dom";
import M, { toast } from "materialize-css";
import { Visibility, VisibilityOff} from '@mui/icons-material';



const Signup = () => {
  const navigate = useNavigate();
  // State variables for user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Here you would typically send the user data to your backend for registration
   fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log("cslog from signup.js fronted");
      if (data.result) {
        M.toast({html: `${data.result}`, classes: 'rounded green'});
        navigate("/login");
      } else {
          M.toast({html: `${data.error}`, classes: `rounded red`});
      }
    })
    .catch(error => {
      console.log("Error:", error);
    });
  };

  const validateEmail = (email) => {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      M.toast({ html: "Invalid email address", classes: "rounded red" });
      return;
    }
    let passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push("Password must contain at least one number.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      passwordErrors.push("Password must contain at least one special character.");
    }
    if (passwordErrors.length > 0) {
      M.toast({ html: passwordErrors.join("<br/>"), classes: "rounded red" });
      return;
    }
    if (password !== confirmPassword) {
      M.toast({ html: "Passwords do not match", classes: "rounded red" });
      return;
    }
    registerUser();
  };
  

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div
        className="row"
        style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <div
          className="card"
          style={{
            width: "400px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Signup</h3>
          <div className="card-content" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="First Name"
              className="validate"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="validate"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="validate"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                  userSelect: "none",
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <i className="material-icons"><VisibilityOff/></i>
                ) : (
                  <i className="material-icons"><Visibility/></i>
                )}
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="validate"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                  userSelect: "none",
                }}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <i className="material-icons"><VisibilityOff/></i>
                ) : (
                  <i className="material-icons"><Visibility/></i>
                )}
              </span>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={handleSignup}>
            Signup
          </button>
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Signup;