// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import FakeStackOverflow from './components/fakestackoverflow.js';
import { Login } from './components/login.js';
import { Register } from './components/register.js';
import { Welcome } from './components/Welcome.js';
import React from 'react';

import {useState} from 'react';
function App() {
  const [currentForm, setCurrentForm] = useState('welcome');
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);  //To do: Implement Messages
  const [sessionId, setSessionId] = useState(''); 
  const [user, setUser] = useState('');

  const handlePageChange = (formType) => {
    setCurrentForm(formType);
  };

  return (
    <section className="fakeso">
      {currentForm === 'welcome' ? (
        <Welcome onFormChange={handlePageChange} />
      ) : currentForm === 'login' ? (
        <Login
          setSessionId={setSessionId}
          setUser={setUser}
          setCurrentForm={setCurrentForm}
        />
      ) : currentForm === 'register' ? (
        <Register
          setCurrentForm={setCurrentForm}
        />
      ) : currentForm === 'guest' ? (
        <FakeStackOverflow user="guest" sessionId={sessionId}
        onLogOutClick={() => setCurrentForm('welcome')} />
      ) : (
        <FakeStackOverflow
          user={user}
          sessionId={sessionId}
          onLogOutClick={() => setCurrentForm('welcome')}
        />
      )}
    </section>
  );
}

export default App;
