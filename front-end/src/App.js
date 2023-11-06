import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Chat from './chat/Chat';

function App() {
  const [user, setUser] = useState({}); 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login location='login' setUser={setUser} />} />
        <Route path="/forgotPassword" element={<Login location='/forgotPassword' setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard location='/dashboard' user={user} setUser={setUser} />} />
        <Route path="/chat" element={<Dashboard location='/chat' user={user} setUser={setUser} />} />
        <Route path="/projects" element={<Dashboard location='/projects' user={user} setUser={setUser} />} />
        <Route path="/register" element={<Dashboard location='/register' user={user} setUser={setUser} />} />
        <Route path="/logout" element={<Dashboard location='/logout' user={user} setUser={setUser} />} />
        {/* <Route path="/chat" element={<Chat user={user} />} /> */}
        <Route path="/" element={<Navigate to="/login" />}/>
      </Routes>
    </Router>
  );
}

export default App;
