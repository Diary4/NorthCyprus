import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ApplyNow from './views/ApplyNow';
import Departments from './views/Departments';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/apply-now' element={<ApplyNow />}/>
      <Route path='/departments' element={<Departments />} />
    </Routes>
  </Router>
  )
}

export default App
