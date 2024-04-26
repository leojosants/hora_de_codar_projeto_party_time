import {
  Outlet
} from 'react-router-dom';

import {
  ToastContainer
} from 'react-toastify';

import Navbar from './components/NavbarComponent/NavbarComponent';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='class-app'>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;