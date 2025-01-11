import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import emuImage from "../assets/EMU.png";

export default function EmuDepartments() {

  const { EMU } = university;
  const newEmu = EMU.slice(0,20)

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "EMU departments";
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
            <button className="back" onClick={() => navigate("/")}>
              &lt; Back
            </button>
            <h1>Eastern Medeterrain University</h1>
            <img className="uni-logo" src={emuImage} alt="" />
            <p className="university-description">
              "Eastern Mediterranean University (EMU) established in Northern
              Cyprus in 1979. It has a great reputation among the international
              Universities; it is one of the top 1500 Universities in all over
              the world. Therefore, it includes over 20000 students from 106
              countries and 1,100 academicians from different 35 countries.",
            </p>
            <button className="button" onClick={() => navigate("/apply-now")}>
              Apply now
            </button>
          </div>
        </div>
        <div className="department-section">
          <h2>Departments of the University</h2>
          <div className="department-card">
            {newEmu.map((card, index) => (
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
