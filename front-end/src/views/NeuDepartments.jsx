import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import neuImage from "../assets/NEU.png";

export default function Departments() {
  const { NEU } = university;

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "NEU Departments";
  }, []);

  const navigate = useNavigate();
  const [selectedDegree, setSelectedDegree] = useState();
  const [showDepartment, setShowDepartment] = useState([]);

  const OrderByDegree = (e) => {
    const selected = e.target.value;
    setSelectedDegree(selected);

    const filteredDepartments = NEU.filter(
      (item) => item.type.toLowerCase() === selected.toLowerCase()
    );

    setShowDepartment(filteredDepartments);
    console.log(selected);
    console.log(filteredDepartments);
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
            <h1>Near East University</h1>
            <img className="uni-logo" src={neuImage} alt="" />
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
            <p className="aler alert-secondary mt-4">No Department Available</p>
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
