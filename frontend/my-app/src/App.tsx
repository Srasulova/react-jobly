import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // for decoding JWT tokens
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import CompaniesList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import JobList from './components/JobList';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import JoblyApi from '../../../api';
import { UserContext } from '../src/hooks/useUserContext';
import { User, DecodedToken } from '../src/types'; // Import shared types

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Function to handle login
  const login = async (userData: { username: string; password: string }) => {
    try {
      const token = await JoblyApi.loginUser(userData);
      JoblyApi.token = token;
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to handle signup
  const signup = async (userData: { username: string; password: string; firstName: string; lastName: string; email: string }) => {
    try {
      const token = await JoblyApi.registerUser(userData);
      JoblyApi.token = token;
      setToken(token);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Function to handle logout
  const logout = () => {
    JoblyApi.token = '';
    setToken(null);
    setCurrentUser(null);
  };

  // Effect to load user data when token changes
  useEffect(() => {
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const fetchUser = async () => {
        try {
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };

      fetchUser();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
