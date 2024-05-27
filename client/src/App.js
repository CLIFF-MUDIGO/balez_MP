import { useSelector } from 'react-redux'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';




function App() {
  const {loading} = useSelector((state) => state.loaders);
  return (
    <div>
     {loading && <Spinner />}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>

      </BrowserRouter>
    
    </div>
  );
}

export default App;
