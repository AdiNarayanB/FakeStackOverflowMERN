import React from 'react';

export const Welcome = ({onFormChange}) => {

    // const handleLogin = (e) => {
    //     e.preventDefault() //we dont want the form to reload
    //     console.log("Login form opens");
    // }

    // const handleRegister = (e) => {
    //     e.preventDefault() //we dont want the form to reload
    //     console.log("redirects to registration form");
    // }

    // const handleGuest = (e) => {
    //     e.preventDefault() //we dont want the form to reload
    //     console.log(" User continues as a Guest");
    // }

    return (
        <>
        <div className="welcome-style">
        <div className='welcome-header'>
            Welcome to FakeStackOverflow
        </div>
        <button className="welcome-button" onClick={() => onFormChange('login')}>Log In</button>
        <button className="welcome-button" onClick={() => onFormChange('register')}>Register</button>
        <button className="welcome-button" onClick={() => onFormChange('guest')}>Guest User</button>
        </div>
        </>
       
    )
}
