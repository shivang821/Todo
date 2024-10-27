// src/components/ProjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css'
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="project-card" onClick={handleCardClick}>
      <h4>Ecommerce</h4>
      <p>{new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default ProjectCard;
