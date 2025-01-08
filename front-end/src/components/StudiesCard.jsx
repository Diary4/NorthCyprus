import React from "react";

export default function StudiesCard({ icon, title }) {
  return (
    <div className="studies-card">
      <div className="studies-card__icon">
        <i>{icon}</i>
      </div>
      <p>{title}</p>
    </div>
  );
}
