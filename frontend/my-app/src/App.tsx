import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import CompaniesList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import JobList from './components/JobList';
// import CompanyJobs from './components/CompanyJobs';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
