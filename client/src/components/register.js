import React, { useState } from 'react';
import axios from 'axios';

export const Register = ({setCurrentForm}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const validateFormInput = async (event) => {
    event.preventDefault();

    try {
      
      // Make API call to register endpoint using axios
      const response = await axios.post('http://localhost:8000/register', {
        username,
        email,
        password,
        confirmPassword,
      });
     

       console.log('Registration successful');
       setCurrentForm('login'); 
      
            // console.log(setSignUp)
      // Assuming your server returns a JSON object with a sessionId property
      console.log(response);
    } catch (error) {
      console.log(error);
      if(error.response.data.status === "errorPass"){
      setErrMsg("Password Invalid");
      }
      if(error.response.data.status === "errorUser"){
      setErrMsg("Username Taken");
      }
      if(error.response.data.status === "errorPassUser"){
      setErrMsg("Username Taken and Password Invalid");
      }
      console.error('Registration error:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return(
        <form className='register-form' onSubmit={validateFormInput}>
        <div className='register-header'>Register</div>
        <div id = 'errmsg'>  {errMsg} </div> 
        <div className='register-label'>Username</div>
        <input
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
       
        type="text"
        id = "username"
        className="input"
        placeholder="Enter Username"
        />

        
        <div className='register-label'>Email</div>  
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
       
        type="text"
        id = "email"
        className="input"
        placeholder="Enter Email"
        />
    
    
        <div className='register-label'>Password</div>
        <input
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        
        type="text"
        id = "password"
        className="input"
        placeholder="Enter Password"
        />

        <div className='register-label'>Confirm Password</div>
        <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
        name="email"
        id = "confirmPassword"
        type="text"
        className="input"
        placeholder="Enter Confirm Password"
        />
        <button className="signup-button" onClick={validateFormInput}>Sign Up</button>
    </form>
    
    )
  
};