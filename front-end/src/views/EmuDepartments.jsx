import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import emuImage from "../assets/EMU.png";

export default function EmuDepartments() {
  const { EMU } = university;

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "EMU departments";
  }, []);

  const navigate = useNavigate();

  const [selectedDegree, setSelectedDegree] = useState();
  const [showDepartment, setShowDepartment] = useState([]);

  const OrderByDegree = (e) => {
    const selected = e.target.value;
    setSelectedDegree(selected);

    const filteredDepartments = EMU.filter(
      (item) => item.type.toLowerCase() === selected.toLowerCase()
    );

    setShowDepartment(filteredDepartments);
  };

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
          <div>
            <select
              className="form-select"
              aria-label="Default select example"
              id="degree"
              onChange={OrderByDegree}
            >
              <option selected hidden>
                Show Departments by Degree
              </option>
              <option value="Associate">Associate</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master with Thesis">Master With thesis</option>
              <option value="Master non Thesis">Master without thesis</option>
              <option value="PhD">Phd</option>
            </select>
            {showDepartment.length === 0 && selectedDegree && (
              <p className="alert alert-secondary mt-4">
                No Department Available
              </p>
            )}
          </div>
          <div className="department-card">
            {showDepartment.map((card, index) => (
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
