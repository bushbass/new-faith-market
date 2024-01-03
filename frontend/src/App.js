import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import EditBusiness from './pages/EditBusiness';
import SingleBusiness from './pages/SingleBusiness';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/edit/:id" element={<EditBusiness />} />
            <Route path="/single/:id" element={<SingleBusiness />} />
            <Route
              path="/user"
              element={user ? <UserHome /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <footer>Copyright 2024 Faith Center and Alex Nielsen</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
