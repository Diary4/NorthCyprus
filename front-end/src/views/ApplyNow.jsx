import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Header from "../components/Header";
import "../assets/css/applynow.css"; // Custom CSS for animations
import Personalinfo from "../components/ApplyNowForms/Personalinfo";
import FileAttachment from "../components/ApplyNowForms/FileAttachment";
import Degree from "../components/ApplyNowForms/Degree";
import UniversitySelect from "../components/ApplyNowForms/UniversitySelect";
import Swal from "sweetalert2";

export default function ApplyNow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsSmallScreen(mediaQuery.matches);
    const handleResize = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleFinalSubmit = async (data) => {

    const finalFormData = new FormData();
  
    for (let key in data) {
      if (data[key] instanceof FileList) {
        
        for (let file of data[key]) {
          finalFormData.append(key, file);
        }
      } else {
        
        finalFormData.append(key, data[key]);
      }
    }
    for (let [key, value] of finalFormData.entries()) {
      console.log(`${key}:`, value);
    }
  
    console.log(finalFormData)
    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        body: finalFormData,
      });
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Application submitted!",
          text: "We will get back to you shortly.",
          confirmButtonColor: "#3085d6",
        });
  
        setFormData({});
        setCurrentStep(1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (e) {
      console.log('Error while submitting', e);
    }
  };
  
  // Steps components
  const steps = [
    <Degree
      key="degree"
      nextStep={nextStep}
      updateFormData={updateFormData}
      formData={formData}
    />,
    <UniversitySelect
      key="universitySelect"
      prevStep={prevStep}
      nextStep={nextStep}
      updateFormData={updateFormData}
      formData={formData}
    />,
    <Personalinfo
      key="personalInfo"
      prevStep={prevStep}
      nextStep={nextStep}
      updateFormData={updateFormData}
      formData={formData}
    />,
    <FileAttachment
      key="fileAttachment"
      prevStep={prevStep}
      handleFinalSubmit={handleFinalSubmit}
      updateFormData={updateFormData}
      formData={formData}
    />,
  ];

  return (
    <div className="applynow">
      <header>
        <Header />
      </header>
      <main className="container mt-5 applynow-main">
        {!isSmallScreen ? (
          <SwitchTransition mode="out-in">
            <CSSTransition key={currentStep} timeout={300} classNames="fade">
              <div>{steps[currentStep - 1]}</div>
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <div>{steps[currentStep - 1]}</div>
        )}
      </main>
    </div>
  );
}
