import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Universities from "../../utilities/University";

export default function UniversitySelect({
  prevStep,
  nextStep,
  updateFormData,
  formData,
}) {
  const [university, setUniversity] = useState(formData.university || "");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    formData.department || ""
  );
  const[scholarShip, setScholarShip] = useState()
  const [tuitionFee, setTuitionFee] = useState();
  const [scope, setScope] = useState();
  const [educationType, setEducationType] = useState();
  const [language, setLanguage] = useState();
  const { NEU, BAU, CIU, EMU } = Universities;
  const { degree } = formData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    if (university && degree) {
      const selectedDepartments =
        universityData[university]?.[degree.toLowerCase()] || [];
      setDepartments(selectedDepartments);
      if (formData.department) {
        setScholarShip(formData.scholarship)
        setSelectedDepartment(formData.department);
        setValue("department", formData.department);
        setValue('scholarship', formData.scholarship)
      }
    }
  }, [university, degree, formData.department, setValue]);

  const universityData = {
    NEU: {
      associate: NEU.filter((item) => item.type === "Associate").map(
        (item) => item.program
      ),
      bachelor: NEU.filter((item) => item.type === "Bachelor").map(
        (item) => item.program
      ),
      master: NEU.filter((item) => item.type === "Master").map(
        (item) => item.program
      ),
      phd: NEU.filter((item) => item.type === "Phd").map(
        (item) => item.program
      ),
    },
    BAU: {
      associate: BAU.filter((item) => item.type === "Associate").map(
        (item) => item.program
      ),
      bachelor: BAU.filter((item) => item.type === "Bachelor").map(
        (item) => item.program
      ),
      master: BAU.filter((item) => item.type === "Master").map(
        (item) => item.program
      ),
      phd: BAU.filter((item) => item.type === "PhD").map(
        (item) => item.program
      ),
    },
    CIU: {
      associate: CIU.filter((item) => item.type === "Associate").map(
        (item) => item.program
      ),
      bachelor: CIU.filter((item) => item.type === "Bachelor").map(
        (item) => item.program
      ),
      master: CIU.filter((item) => item.type === "Master").map(
        (item) => item.program
      ),
      phd: CIU.filter((item) => item.type === "PhD").map(
        (item) => item.program
      ),
    },
    EMU: {
      associate: EMU.filter((item) => item.type === "Associate").map(
        (item) => item.program
      ),
      bachelor: EMU.filter((item) => item.type === "Bachelor").map(
        (item) => item.program
      ),
      master: EMU.filter((item) => item.type === "Master").map(
        (item) => item.program
      ),
      phd: EMU.filter((item) => item.type === "PhD").map(
        (item) => item.program
      ),
    },
  };

  const handleUniversityChange = (e) => {
    const selectedUniversity = e.target.value;
    setUniversity(selectedUniversity);
    if (degree) {
      setDepartments(
        universityData[selectedUniversity]?.[degree.toLowerCase()] || []
      );
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);
    setValue("department", selectedDept);

    let selectedData = "";

    switch (university) {
      case "NEU":
        selectedData = NEU.find((item) => item.program === selectedDept);
        break;
      case "CIU":
        selectedData = CIU.find((item) => item.program === selectedDept);
        break;
      case "BAU":
        selectedData = BAU.find((item) => item.program === selectedDept);
        break;
      case "EMU":
        selectedData = EMU.find((item) => item.program === selectedDept);
        break;
      default:
        console.log("No university is selected");
    }

    if (selectedData) {
      setTuitionFee(selectedData.tuitionFee);
      setScope(selectedData.scope);
      setEducationType(selectedData.educationType);
      setLanguage(selectedData.language);
    } else {
      setTuitionFee("Program not found");
    }
  };

  const onSubmit = async (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="text-center mb-4">Select Your University</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="university" className="form-label">
                Select a university
              </label>
              <select
                {...register("university", {
                  required: "University is required",
                })}
                className="form-select"
                aria-label="Default select example"
                onChange={handleUniversityChange}
                value={university}
              >
                <option value="" hidden>
                  Open this select menu
                </option>
                <option value="NEU">Near East University</option>
                <option value="CIU">Cyprus International University</option>
                <option value="BAU">Bahecesehir Cyprus University</option>
                <option value="EMU">Eastern Mediterranean University</option>
              </select>
              {errors.university && (
                <p className="alert alert-danger">
                  {errors.university.message}
                </p>
              )}
            </div>

            {/* Department Selection */}
            {university && (
              <div className="col-md-6">
                <label htmlFor="department" className="form-label">
                  Select Department
                </label>
                <select
                  {...register("department", {
                    required: "Department is required",
                  })}
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedDepartment} // Bind to selected department state
                  onChange={handleDepartmentChange}
                >
                  <option value="" hidden>
                    Open this select menu
                  </option>
                  {departments.length > 0 ? (
                    departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))
                  ) : (
                    <option disabled>No departments available</option>
                  )}
                </select>
                {errors.department && (
                  <p className="alert alert-danger">
                    {errors.department.message}
                  </p>
                )}
              </div>
            )}
            {university && (
              <div
                className="btn-group mt-4 d-flex justify-content-start ml-3"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  {...register("scholarship")}
                  type="checkbox"
                  className="btn-check"
                  id="scholarship"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="scholarship"
                  style={{ flex: "0 0 auto", width: "auto" }}
                >
                  Scholarship
                </label>
              </div>
            )}

            <div className="row mt-4 ml-2">
              {tuitionFee && (
                <div>
                  <p>
                    Tuition Fee is:{" "}
                    <span className="font-weight-bold">
                      {tuitionFee.symbol}
                      {tuitionFee.value}
                    </span>
                  </p>
                </div>
              )}
              {scope && (
                <div>
                  <p>
                    Scope : <span className="font-weight-bold">{scope}</span>
                  </p>
                </div>
              )}
              {educationType && (
                <div>
                  <p>
                    Education Type :{" "}
                    <span className="font-weight-bold">{educationType}</span>
                  </p>
                </div>
              )}
              {language && (
                <div>
                  <p>
                    Language:{" "}
                    <span className="font-weight-bold">{language}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                onClick={prevStep}
                type="button"
                className="btn btn-link text-decoration-none"
              >
                &lt; Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
