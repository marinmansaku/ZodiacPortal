import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './components/Header/Header';
import PrintPage from './pages/PrintPage';
import BatchPage from './pages/BatchPage';
import AlloysPage from './pages/AlloysPage';
import LabAnalysisPage from './pages/LabAnalysisPage';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="login" element={<LoginPage />}/>
        <Route path="batch" element={<BatchPage/>}/>
        <Route path="alloys" element={<AlloysPage/>}/>
        <Route path="" element={<PrintPage />}/>
        <Route path="analysis" element={<LabAnalysisPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
