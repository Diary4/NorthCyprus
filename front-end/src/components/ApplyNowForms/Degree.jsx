import React, { useState } from "react";
import "../../assets/css/degree.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Degree({ nextStep, updateFormData, formData }) {

  const arrayOfDegrees = [
    {
      title: "Associate Degree",
      value:'associate'
    },
    {
      title: "Bachelor's Degree",
      value:'bachelor'
    },
    {
      title: "Master Degree",
      value:'master'
    },
    {
      title: "PhD Degree",
      value:'phd'
    },
  ];

  const [selectedDegree, setSelectedDegree] = useState(formData.degree || "");
  
  useEffect(() => {
    setSelectedDegree(formData.degree || "");
  }, [formData]);
  
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    updateFormData({ ...formData, degree: selectedDegree });
    nextStep();
  };

  const handleSelectDegree = (degree) => {
    setSelectedDegree(degree);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="text-center mb-4">
          Select a Degree
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="degree-form">
          {arrayOfDegrees.map((degree, index) => (
            <div
              key={index}
              className={`title-cont ${
                selectedDegree === degree.value ? "selected" : ""
              }`}
              onClick={() => handleSelectDegree(degree.value)}
            >
              {degree.title}
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedDegree}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
