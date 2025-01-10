import React from 'react'
import '../assets/css/Header.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate();

  return (
    <div className="header">
        <div className='left-section' onClick={() => navigate('/')}>
            <h1><a href="#top-section">Logo</a></h1>
        </div>
        <div className='middle-section'>
            <ul className='nav'>
                <li><a href="#main-middle-section">Universities</a></li>
                <li><a href="#footer">Contact</a></li>
                <li onClick={() => navigate('/departments')}>Departments</li>
            </ul>
        </div>
        <div className='right-section'>
            <button onClick={() => navigate('/apply-now')}>Apply Now</button>
        </div>
    </div>
  )
}
