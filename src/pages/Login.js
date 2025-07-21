import { Link ,useNavigate} from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../App";

import M from "materialize-css";

const Login = () => {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const BASE_URL = process.env.BASE_URL;

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // handle successful login, e.g., save token, redirect, etc.
        // localStorage.setItem("token", data.token);
        //have a toast here
       
        M.toast({html: `Login Successful`, classes: 'rounded green'});
         navigate("/courses");
         //save the token and user info in localStorage
         localStorage.setItem("jwt", data.jwttoken);
         localStorage.setItem("userInfo", data.userinfo ? JSON.stringify(data.userinfo) : null);
         //dispath the action and state
         dispatch({ type: "SET_USER", payload: data.userinfo });
         console.log(data);
      } else {
        setError(data.message || "Login failed");
      }
      } catch (err) {
      setError("Network error");
      }
      setLoading(false);
    };

    // Email regex validation function
    const isValidEmail = (email) => {
      // Simple email regex pattern
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    return (  

      
      <div className="row " style={{marginTop: '50px',display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:"80vh"
      }}>
      <div className="card" style={{width: '400px', padding: '20px', display:"flex", flexDirection: 'column', alignItems: 'center' }}>
      <h3>Login Page</h3>
      <form
        className="card-content"
        style={{width: '100%'}}
        onSubmit={e => {
        e.preventDefault();
        setError("");
        if (!isValidEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        handleLogin(e);
        }}
      >
      <input
        type="text"
        placeholder="Email"
        className="validate"
        style={{width: '100%', marginBottom: '15px'}}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <div style={{position: 'relative', width: '100%'}}>
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="validate"
        style={{width: '100%'}}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        />
        <span
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        userSelect: 'none'
        }}
        title={showPassword ? "Hide password" : "Show password"}
        >
        {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
      <button
        className="waves-effect waves-light btn"
        type="submit"
        style={{width: "100%", marginTop: "20px"}}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      </form>
      <h6>Don't have an account? <Link to="/signup">Signup</Link></h6>
      </div>
      </div>
    );
}

export default Login;
