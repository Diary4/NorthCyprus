import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import ciuImage from "../assets/CIU.png";

export default function CiuDepartments() {
  const { CIU } = university;
  const newCiu = CIU.slice(0,20)

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "CIU Departments";
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
            <h1>Cyprus International University</h1>
            <img className="uni-logo" src={ciuImage} alt="" />
            <p className="university-description">
              "Cyprus International University is a modern campus University
              based in the suburb of Haspolat on the outskirts of Nicosia, the
              capital city of Cyprus. At the cornerstone of three continents and
              rich in terms of history and culture, North Cyprus, the pearl of
              the Mediterranean, offers a truly international experience.",
            </p>
            <button className="button" onClick={() => navigate("/apply-now")}>
              Apply now
            </button>
          </div>
        </div>
        <div className="department-section">
          <h2>Departments of the University</h2>
          <div className="department-card">
            {newCiu.map((card, index) => (
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
