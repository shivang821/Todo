// src/components/ProjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css'
import axios from 'axios';
const ProjectCard = ({ project ,fetchProjects}) => {
  const navigate = useNavigate();
  console.log(project);
  
  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };
  const deleteProject=async(e,id)=>{
    try {
      e.stopPropagation();
      const {data}=await axios.delete(`/backend/api/projects/${id}`)
      alert(data)
      fetchProjects()
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="project-card" onClick={handleCardClick}>
      <div className="project-card1">
        <p>{project.title}</p>
      </div>
      <div className="project-card2">
        <p>{project.createdDate}</p>
        <button onClick={(e)=>deleteProject(e,project.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProjectCard;
