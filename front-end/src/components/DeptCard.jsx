import React from "react";

export default function DeptCard({ type, title, tuitionFee, language, scope}) {
  return (
    <div className="studies-card-dept">
      <p className="title">{title}</p>
      <p>Degree: {type}</p>
      <p>Tuition Fee: {tuitionFee.symbol}{tuitionFee.value}</p>
      <p>Language: {language}</p>
      <p>Scope: {scope}</p>
    </div>
  );
}
