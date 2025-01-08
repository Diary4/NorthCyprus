import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ApplyNow from './views/ApplyNow';
import Data from './views/Data';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/apply-now' element={<ApplyNow />}/>
      <Route path='/data' element={<Data />}/>
    </Routes>
  </Router>
  )
}

export default App
