import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './components/Header/Header';
import PrintPage from './pages/PrintPage';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="login" element={<LoginPage />}/>
        <Route path="" element={<PrintPage />}/>
      </Routes>
    </div>
  );
}

export default App;
