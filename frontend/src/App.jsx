import { Route, Routes, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage'; // Create this
import { getToken } from './lib/auth';

function App() {
  const PrivateRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" />;
  };

  return (
    <div data-theme="forest">
      <Routes>
        {/* ✅ Protected Routes */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreatePage /></PrivateRoute>} />
        <Route path="/note/:id" element={<PrivateRoute><NoteDetailPage /></PrivateRoute>} />

        {/* ✅ Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </div>
  );
}

export default App;


/*
import {Route, Routes} from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
//import toast from 'react-hot-toast';
function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/note/:id' element={<NoteDetailPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
*/