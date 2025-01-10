import React from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from '../utilities/University.js'

export default function Departments() {


  const {NEU , CIU, BAU, EMU} = university



  return (
    <div className="department-page">
      <header>
        <Header />
      </header>
      <main className="department-main">
        <div className="university-cont">
          <div className="uni-cont-content">
            <h1>Near East University</h1>
            <p className="university-description">
              Near East University is the most comprehensive and equipped
              education institution in Cyprus, which raises individuals that are
              beneficial for its country, moves forward with secure steps, has
              20 faculties, 6 institutes, 5 colleges, 32 research centres, 196
              undergraduate, 240 graduate and doctorate programs and over 28,000
              students from 143 different countries. Near East University, which
              carries an international identity with its education facilities
              and strong team of academic staff, has a deeply rooted education
              culture. It has taken its position as an education, science and
              culture centre since 1988. Near East University operates under an
              international and multicultural identity with its highly competent
              teaching staff in addition to its world standard education and
              infrastructure. Near East University, which projects the identity
              of the greatest science and culture centre in the Mediterranean,
              has the principle of educating individuals who are self-confident,
              responsible, smart, creative, researchers and are free thinking.
            </p>
          </div>
        </div>
        <div className="department-section">
          <h2>Departments of the university</h2>
          <div className="department-card">
            {NEU.map((card, index) => (
              <DeptCard 
                key={index}
                type={card.type}
                icon={'Icon'}
                title={card.program}
                tuitionFee={card.tuitionFee}
                language={card.language}
                scope={card.scope}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
