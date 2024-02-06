import React, {useState } from 'react';
import axios from 'axios';
//import FakeStackOverflow from './fakestackoverflow.js';
export const Login = ({setUser,setSessionId,setCurrentForm}) => {
    const [email, setEmail] = useState('');
    const [password, setpassword] =  useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async(event) => {
         //we dont want the form to reload
        console.log(email);
        console.log(password);
        event.preventDefault();

    try {
      // Make API call to register endpoint using axios
      const response = await axios.post('http://localhost:8000/authenticate', {
        
        email,
        password,
        
      });
      
      
      
      console.log(response);
      

      // Save session ID locally
      

      // Other logic, e.g., redirect to another page or update state
      console.log('Auth successful');
     // const user = response.data.sessionObj.userId;
     // const sessionId = response.data.sessionObj.sessionId
      setUser(response.data.sessionObj.username);
      setSessionId(response.data.sessionObj.sessionId);
      setCurrentForm('userAuth');
      
      
      //GO TO FAKESO JS AFTER THIS
      
      
    } catch (error) {
      setErrMsg(error.response.data.message);
      
      console.error('Auth error:', error);
      // Handle error, e.g., show an error message to the user
    }
        // if successfull set isguest = 0 and continue to fakestackoverflow
        
        
    }
    return (
        <>
        <div id= "errMesg"> {errMsg} </div>
        <form className="login-form">
            <div className='login-header'>Login</div>
            <label className="login-label" htmlFor="email">Email</label>
            <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@gmail.com" id="email" name="email"/> 
            <label className="login-label" htmlFor="password">Password</label>
            <input className="login-input" value={password} onChange={(e) => setpassword(e.target.value)}  type="password" placeholder="********" id="password" name="password"/> 
            <button className="login-button" onClick={handleSubmit}>Log In</button>
        </form>
        
        </>
       
    )
}
