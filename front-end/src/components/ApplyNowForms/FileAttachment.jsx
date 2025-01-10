import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FileAttachment({ prevStep, updateFormData, formData, handleFinalSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset,
  } = useForm();


  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = async (data) => {
    const files = {
      cv: data.cv || null, 
      passport: data.passport|| null,
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
    console.log(updatedFormData)
   
    handleFinalSubmit(updatedFormData);
  
    reset();
  };
  
  
  

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="text-center mb-4">Upload your files</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            {/* CV Input */}
            <div className="col-md-6">
              <label htmlFor="CV" className="form-label">
                CV
              </label>
              <input
                {...register("cv")}
                type="file"
                id="CV"
                className="form-control-file form-control"
              />
            </div>
            
            {/* Passport Input */}
            <div className="col-md-6">
              <label htmlFor="passport" className="form-label">
                Passport
              </label>
              <input
                {...register("passport", { required: "Passport Document is required" })}
                type="file"
                id="passport"
                className="form-control-file form-control"
                accept=".pdf , .jpg , .png , .jpeg"
              />
              {errors.passport && <p className="alert alert-danger">{errors.passport.message}</p>}
            </div>
            
            {/* Document 1 Input */}
            <div className="col-md-6">
              <label htmlFor="personalImage" className="form-label">
                Personal image
              </label>
              <input
                {...register("personalImage")}
                type="file"
                id="document1"
                className="form-control-file form-control"
              />
            </div>

            {/* Document 2 Input */}
            <div className="col-md-6">
              <label htmlFor="document2" className="form-label">
                Document 2
              </label>
              <input
                {...register("document2")}
                type="file"
                id="document2"
                className="form-control-file form-control"
              />
            </div>

            {/* Document 3 Input */}
            <div className="col-md-6">
              <label htmlFor="document3" className="form-label">
                Document 3
              </label>
              <input
                {...register("document3")}
                type="file"
                id="document3"
                className="form-control-file form-control"
              />
            </div>

            {/* Document 4 Input */}
            <div className="col-md-6">
              <label htmlFor="document4" className="form-label">
                Document 4
              </label>
              <input
                {...register("document4")}
                type="file"
                id="document4"
                className="form-control-file form-control"
              />
            </div>

            {/* Document 5 Input */}
            <div className="col-md-6">
              <label htmlFor="document5" className="form-label">
                Document 5
              </label>
              <input
                {...register("document5")}
                type="file"
                id="document5"
                className="form-control-file form-control"
              />
            </div>

            {/* Document 6 Input */}
            <div className="col-md-6">
              <label htmlFor="document6" className="form-label">
                Document 6
              </label>
              <input
                {...register("document6")}
                type="file"
                id="document6"
                className="form-control-file form-control"
              />
            </div>
          </div>

          {/* Buttons */}
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
