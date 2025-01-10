import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ApplyNow from './views/ApplyNow';
import NeuDepartments from './views/NeuDepartments';
import CiuDepartments from './views/CiuDepartments'
import BauDepartments from './views/BauDepartments';
import EmuDepartments from './views/EmuDepartments';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/apply-now' element={<ApplyNow />}/>
      <Route path='/neu-departments' element={<NeuDepartments />} />
      <Route path='/ciu-departments' element={<CiuDepartments />}/>
      <Route path='/bau-departments' element={<BauDepartments />}/>
      <Route path='/emu-departments' element={<EmuDepartments />}/>
    </Routes>
  </Router>
  )
}

export default App
