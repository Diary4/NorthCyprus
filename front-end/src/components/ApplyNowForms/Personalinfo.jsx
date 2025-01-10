import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Personalinfo({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [isValid, setIsValid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // Add reset function
  } = useForm();

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData, reset]);

  const onSubmit = async (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="text-center mb-4">Enter your personal information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            {/* First Name */}
            <div className="col-md-6">
              <label htmlFor="first-name" className="form-label">
                First name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First Name should be at least 2 characters",
                  },
                })}
                type="text"
                id="first-name"
                placeholder="E.g. John"
                className="form-control"
              />
              {errors.firstName && (
                <p className="alert alert-danger">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="fathersName" className="form-label">
                Father name
              </label>
              <input
                {...register("fathersName", {
                  required: "Father name is required",
                  minLength: {
                    value: 2,
                    message: "Father's Name should be at least 2 characters",
                  },
                })}
                type="text"
                id="fathers-name"
                placeholder="E.g. John Doe"
                className="form-control"
              />
              {errors.fathersName && (
                <p className="alert alert-danger">{errors.fathersName.message}</p>
              )}
            </div>
            {/* Last Name */}
            <div className="col-md-6">
              <label htmlFor="last-name" className="form-label">
                Last name
              </label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last Name should be at least 2 characters",
                  },
                })}
                type="text"
                id="last-name"
                placeholder="E.g. Doe"
                className="form-control"
              />
              {errors.lastName && (
                <p className="alert alert-danger">{errors.lastName.message}</p>
              )}
            </div>
            {/* Date of Birth */}
            <div className="col-md-6">
              <label htmlFor="date-of-birth" className="form-label">
                Date of Birth
              </label>
              <input
                {...register("DOB", {
                  required: "Date of birth is required",
                })}
                type="date"
                id="date-of-birth"
                className="form-control"
              />
              {errors.DOB && (
                <p className="alert alert-danger">{errors.DOB.message}</p>
              )}
            </div>
            {/* Father's Name */}
            
            {/* Nationality */}
            <div className="col-md-6">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <select
                {...register("nationality", {
                  required:'Nationality is required'
                })
                }
                id="nationality"
                className="form-select"
              >
                <option value="">Select</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </select>
              {errors.nationality && (
                <p className="alert alert-danger">{errors.nationality.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Phone number
              </label>
              <PhoneInput
                {...register('phone', {
                  required:'Phone number is required',
                  maxLength:{
                    value: 13,
                    message:"invalid phone number"
                  }
                })}
                country={"iq"}
                value={formData.phone}
                onChange={(phone) => {
                  if (phone.length <= 13) {
                    updateFormData({ phone });
                  }
                }}
                onlyCountries={["iq", "tr"]}
                inputProps={{
                  name: "phone",
                }}
                inputStyle={{ width: "100%" }}
              />
              {errors.phone && (
                <p className="alert alert-danger">{errors.phone.message}</p>
              )}
            </div>
            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email Address <span style={{ opacity: "0.5" }}>(Optional)</span>
              </label>
              <input
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email Address",
                  },
                })}
                type="email"
                id="email"
                placeholder="E.g. john@doe.com"
                className="form-control"
              />
            </div>
          </div>
          {/* Buttons */}
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
        </form>
      </div>
    </div>
  );
}
