import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from '../src/screens/CadastroScree'; // Importe a tela de cadastro
import Dashboard from './screens/Dashboard';
import '../src/App.css';

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

  const handleRegisterSuccess = (type: string) => {
    setUserType(type);
  };

  return (
    <Router>
      {/* Provide the AuthContext to your entire application */}
      <AuthContext.Provider value={{ userType, login: handleLoginSuccess }}> 
        <Routes>
          <Route path="/" element={userType ? <Navigate to="/dashboard" /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/cadastro" element={<CadastroScreen onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/dashboard" element={userType === 'user' ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/lojas" element={userType === 'Lojista' ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
