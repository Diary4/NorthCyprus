import React, { useState } from "react";

export default function Data() {
  const [passport, setPassport] = useState(null); // For storing the personal passport image
  const [personal_image, setPersonalImage] = useState(null); // For storing the personal image
  const [cv, setCv] = useState(null); // For storing the CV (as a PDF link)

  const fetchInfo = async (id, document) => {
    try {
      const response = await fetch(`http://localhost:3000/download/${id}/${document}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the document");
      }

      // Parse the response as a Blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob); // Create a URL for the binary file

      // Update the state based on the document type
      if (document === "passport") {
        setPassport(url);
      } else if (document === "personal_image") {
        setPersonalImage(url);
      } else if (document === "cv") {
        setCv(url);
      }
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  };

  return (
    <div>
      {/* Passport Section */}
      <div>
        <p>Passport</p>
        <button onClick={() => fetchInfo("26", "passport")}>Fetch Passport</button>
        {passport && (
          <div>
            <a href={passport} target="_blank" rel="noopener noreferrer"></a>
          </div>
        )}
      </div>

      {/* CV Section */}
      <div>
        <p>CV</p>
        <button onClick={() => fetchInfo("22", "cv")}>Fetch CV</button>
        {cv && (
          <div>
            <a href={cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>
        )}
      </div>

      {/* Personal Image Section */}
      <div>
        <p>Personal Image</p>
        <button onClick={() => fetchInfo("24", "personal_image")}>Fetch Personal Image</button>
        {personal_image && (
          <div>
            <img src={personal_image} alt="Personal Image" style={{ width: "200px", height: "auto" }} />
          </div>
        )}
      </div>
    </div>
  );
}
