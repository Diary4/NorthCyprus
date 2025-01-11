import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import "../assets/css/department.css";
import DeptCard from "../components/DeptCard.jsx";
import university from "../utilities/University.js";
import { useNavigate } from "react-router-dom";
import ciuImage from "../assets/CIU.png";

export default function CiuDepartments() {
  const { CIU } = university;

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "CIU Departments";
  }, []);

  const navigate = useNavigate();

  const [selectedDegree, setSelectedDegree] = useState();
  const [showDepartment, setShowDepartment] = useState([]);

  const OrderByDegree = (e) => {
    const selected = e.target.value;
    setSelectedDegree(selected);

    const filteredDepartments = CIU.filter(
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
              <option value="Masters">Master</option>
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
