import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import bauImage from "../assets/BAU.png";

export default function BauDepartments() {
  const { BAU } = university;
  const newBau = BAU.slice(0, 20);

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "BAU departments";
  }, []);

  const navigate = useNavigate();

  const [selectedDegree, setSelectedDegree] = useState();
  const [showDepartment, setShowDepartment] = useState([]);

  const OrderByDegree = (e) => {
    const selected = e.target.value;
    setSelectedDegree(selected);

    const filteredDepartments = BAU.filter(
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
            <h1>Bahecesehir University</h1>
            <img className="uni-logo" src={bauImage} alt="" />
            <p className="university-description">
              "The University’s purpose, aside from providing an education of
              the highest standards, is to offer its students the means to study
              at different international locations and to acquire a global
              vision by giving them the chance to benefit from equivalent
              academic opportunities on different continents and in different",
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
