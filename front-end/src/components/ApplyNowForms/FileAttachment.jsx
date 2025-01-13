import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FileAttachment({
  prevStep,
  updateFormData,
  formData,
  handleFinalSubmit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  console.log("formData: ", formData);

  const onSubmit = async (data) => {
    const files = {
      cv: data.cv || null,
      passport: data.passport || null,
      document1: data.document1 || null,
      document2: data.document2 || null,
      document3: data.document3 || null,
      document4: data.document4 || null,
      document5: data.document5 || null,
      document6: data.document6 || null,
    };

    const filteredFiles = Object.fromEntries(
      Object.entries(files).filter(([key, value]) => value !== null)
    );

    const updatedFormData = { ...formData, ...data, ...filteredFiles };
    console.log(updatedFormData);

    handleFinalSubmit(updatedFormData);

    reset();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="text-center mb-4">Upload your files</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formData.degree === "bachelor" && (
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="CV" className="form-label">
                  Passport
                </label>
                <input
                  {...register("passport", {
                    required: "Passport is required",
                  })}
                  type="file"
                  id="passport"
                  className="form-control-file form-control"
                />
                {errors.passport && (
                  <p className="alert alert-danger">
                    {errors.passport.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="12-grade-transcript" className="form-label">
                  12th Grade Transcript
                </label>
                <input
                  {...register("grade12Transcript", {
                    required: "12 Grade is rquired",
                  })}
                  type="file"
                  id="12-grade-transcript"
                  className="form-control-file form-control"
                />
                {errors.grade12Transcript && (
                  <p className="alert alert-danger">
                    {errors.grade12Transcript.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {formData.degree === "master" && (
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="CV" className="form-label">
                  Passport
                </label>
                <input
                  {...register("passport", {
                    required: "Passport required",
                  })}
                  type="file"
                  id="passport"
                  className="form-control-file form-control"
                />
                {errors.passport && (
                  <p className="alert alert-danger">
                    {errors.passport.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="bachelorTranscript" className="form-label">
                  Bachelor's Transcript
                </label>
                <input
                  {...register("bachelorTranscript", {
                    required: "Bachelor Transcript is required",
                  })}
                  type="file"
                  id="bachelorTranscript"
                  className="form-control-file form-control"
                />
                {errors.bachelorTranscript && (
                  <p className="alert alert-danger">
                    {errors.bachelorTranscript.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="12-grade-transcript" className="form-label">
                  12th Grade Transcript
                </label>
                <input
                  {...register("grade12Transcript", {
                    required: "12 Grade Transcript is required",
                  })}
                  type="file"
                  id="12-grade-transcript"
                  className="form-control-file form-control"
                />

                {errors.grade12Transcript && (
                  <p className="alert alert-danger">
                    {errors.grade12Transcript.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {formData.degree === "phd" && (
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="CV" className="form-label">
                  Passport
                </label>
                <input
                  {...register("passport", {
                    required: "Passport is required",
                  })}
                  type="file"
                  id="passport"
                  className="form-control-file form-control"
                />
                {errors.passport && (
                  <p className="alert alert-danger">
                    {errors.passport.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="Master-Transcript" className="form-label">
                  Master's Transcript
                </label>
                <input
                  {...register("masterTranscript", {
                    required: "Master's Transcript is required",
                  })}
                  type="file"
                  id="maste rtranscript"
                  className="form-control-file form-control"
                />

                {errors.masterTranscript && (
                  <p className="alert alert-danger">
                    {errors.masterTranscript.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="thesisPropsal" className="form-label">
                  Thesis Propsal
                </label>
                <input
                  {...register("thesisPropsal", {
                    required: "Thesis Propsal is required",
                  })}
                  type="file"
                  id="thesisPropsal"
                  className="form-control-file form-control"
                />
                {errors.thesisPropsal && (
                  <p className="alert alert-danger">
                    {errors.thesisPropsal.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="master-certification" className="form-label">
                  Master's Certification
                </label>
                <input
                  {...register("masterCertification", {
                    required: "Master's Certification is required",
                  })}
                  type="file"
                  id="master-certification"
                  className="form-control-file form-control"
                />
                {errors.masterCertification && (
                  <p className="alert alert-danger">
                    {errors.masterCertification.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="bachelor-transcript" className="form-label">
                  Bachelor's Transcript
                </label>
                <input
                  {...register("bachelorTranscript", {
                    required: "Bachelor's Transcript is required",
                  })}
                  type="file"
                  id="bachelor-transcript"
                  className="form-control-file form-control"
                />
                {errors.bachelorTranscript && (
                  <p className="alert alert-danger">
                    {errors.bachelorTranscript.message}
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="recommendation-letter" className="form-label">
                  Recommendation Letter{" "}
                  <span style={{ opacity: "0.5" }}>(If Available)</span>
                </label>
                <input
                  {...register("recommendationLetter")}
                  type="file"
                  id="recommendationLetter"
                  className="form-control-file form-control"
                />
                {errors.recommendationLetter && (
                  <p className="alert alert-danger">
                    {errors.recommendationLetter.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-link text-decoration-none"
            >
              &lt; Back
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
