import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import AddItem from './pages/AddItems.js';
import Login from './pages/Login.js';
import Signup from './pages/SignUp.js';
import MyReports from './pages/MyReports';
// import lostImage from './assets/lost.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
       <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/myreports" element={<MyReports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
      </Routes>
      </AuthProvider>
       <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

export default App;
