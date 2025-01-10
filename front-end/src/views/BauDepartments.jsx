import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import bauImage from "../assets/BAU.png";

export default function BauDepartments() {
  const { BAU } = university;

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "BAU departments";
  }, []);

  const navigate = useNavigate();

  return (
    <div className="department-page">
      <header>
        <Header />
      </header>
      <main className="department-main">
        <div className="university-cont">
          <div className="uni-cont-content">
            <p className="back" onClick={() => navigate("/")}>
              &lt; Back
            </p>
            <h1>Bahecesehir University</h1>
            <img className="uni-logo" src={bauImage} alt="" />
            <p className="university-description">
              Near East University is the most comprehensive and equipped
              education institution in Cyprus, which raises individuals that are
              beneficial for its country, moves forward with secure steps, has
              20 faculties, 6 institutes, 5 colleges, 32 research centres, 196
              undergraduate, 240 graduate and doctorate programs and over 28,000
              students from 143 different countries. Near East University, which
              carries an international identity with its education facilities.
            </p>
            <button className="button" onClick={() => navigate("/apply-now")}>
              Apply now
            </button>
          </div>
        </div>
        <div className="department-section">
          <h2>Departments of the university</h2>
          <div className="department-card">
            {BAU.map((card, index) => (
              <DeptCard
                key={index}
                type={card.type}
                icon={"Icon"}
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
