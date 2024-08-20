import React, { useCallback, useEffect } from 'react';
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
import useLocalStorage from './hooks/useLocalStorage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [token, setToken] = useLocalStorage<string | null>('jobly-token', null)
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('jobly-user', null);

  // Function to handle login
  const login = async (userData: { username: string; password: string }) => {
    try {
      const token = await JoblyApi.loginUser(userData);
      JoblyApi.token = token;
      setToken(token);

      // Fetch the user immediately after setting the token
      const decodedToken: DecodedToken = jwtDecode(token);
      const username = decodedToken.username;
      await fetchUser(username);
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

      // Fetch the user immediately after setting the token
      const decodedToken: DecodedToken = jwtDecode(token);
      const username = decodedToken.username;
      await fetchUser(username); // Ensure fetchUser completes
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };


  // Function to handle logout
  const logout = () => {
    JoblyApi.token = '';
    setToken(null);
    setCurrentUser(null);
    window.localStorage.removeItem('jobly-token')
    window.localStorage.removeItem('jobly-user');
  };


  const fetchUser = useCallback(async (username: string) => {
    console.log('Calling fetchUser for:', username);
    try {
      const user = await JoblyApi.getUser(username);
      console.log('User fetched:', user);
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setCurrentUser(null); // Clear user if fetching fails
    }
  }, [setCurrentUser]);


  useEffect(() => {
    console.log('Token in useEffect:', token);
    if (token) {
      console.log('Token changed:', token);
      JoblyApi.token = token;
      const decodedToken: DecodedToken = jwtDecode(token);
      const username = decodedToken.username;
      fetchUser(username);
    } else {
      console.log('No token found, clearing user data.');
      setCurrentUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);




  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={<Homepage firstName={currentUser?.firstName} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/jobs" element={<ProtectedRoute element={<JobList />} />} />
          <Route path="/companies" element={<ProtectedRoute element={<CompaniesList />} />} />
          <Route path="/companies/:handle" element={<ProtectedRoute element={<CompanyDetail />} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
