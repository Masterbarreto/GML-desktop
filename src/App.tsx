import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import './App.css';

// Create a context for user authentication
export const AuthContext = createContext<{ userType: string | null, login: (type: string) => void }>({ 
  userType: null, 
  login: () => {} 
});

function App() {
  const [userType, setUserType] = useState<string | null>(null);

  const handleLoginSuccess = (type: string) => {
    setUserType(type);
  };

  return (
    <Router>
      {/* Provide the AuthContext to your entire application */}
      <AuthContext.Provider value={{ userType, login: handleLoginSuccess }}> 
        <Routes>
          <Route path="/" element={userType ? <Navigate to="/dashboard" /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={userType === 'user' ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/lojas" element={userType === 'Lojista' ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
