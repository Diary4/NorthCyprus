import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, content, direct }) => {

  const navigate = useNavigate()

  return (
    <StyledWrapper>
      <div className="card">
        <img className="image" src={img} alt="University-Logo" />
        <div className="content">
          <a href={direct} target="_blank" rel="noopener noreferrer">
            <span className="title">{title}</span>
          </a>
          <p className="desc">{content}</p>
          <a
            className="action"
            href=""
            onClick={() => navigate('departments')}
            rel="noopener noreferrer"
          >
            Browse Departments
            <span aria-hidden="true"> → </span>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    max-width: 300px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid transparent;
    transition: transform 0.3s ease;
    margin-bottom: 4rem;
  }

  .image {
    object-fit: contain;
    width: 100%;
    height: 200px;
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0 auto;
    display: block;
  }

  .content {
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: #111827;
  }

  .desc {
    margin-top: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .action {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #fff;
    background-color: #577bc1;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .action:hover {
    background-color: #344cb7;
  }

  .action span {
    transition: transform 0.3s ease;
  }

  .action:hover span {
    transform: translateX(4px);
  }
`;

export default Card;
