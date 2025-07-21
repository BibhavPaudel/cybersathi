import React, { useReducer, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import CreateCourse from './pages/CreateCourse';
import Switch from '@mui/material/Switch';
import {initialState, userReducer} from "./reducers/userReducer";



  
export const UserContext = React.createContext();

const CustomRouting = () => {
  const navigate = useNavigate();
  const { state,dispatch } = useContext(UserContext);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || null; // Retrieve user info from localStorage because it stores as a string
  if (user) {
    dispatch({ type: "SET_USER", payload: user });
  navigate("/");
  }
  else{
    navigate("/login");
  }
},[]);

  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createcourse" element={<CreateCourse />} />
      </Routes>
     
  );
};


function App() {
  //simmilar to useState, useReducer is used to manage state in a more complex way
  const [state, dispatch] = useReducer(userReducer, initialState);
 

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    <Router>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            
      
      <Navbar />
      <CustomRouting />
    </Router>
    </UserContext.Provider>
  );
}

export default App;

      