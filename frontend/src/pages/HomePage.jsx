// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';
import { useNavigate } from 'react-router-dom';
import './home-projectDetail.css'
const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [addProject,setAddProject]=useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [title,setTitle]=useState("");
  useEffect(() => {
    // Fetch user and project details
    const fetchUserData = async () => {
      const userResponse = await axios.get('/api/user/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(userResponse.data);
      const projectResponse = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects(projectResponse.data);
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const addNewProject=()=>{
    const newProject={};
    setProjects((prev)=>{
        return [...prev,newProject]
    })
  }
  return (
    <div className="home-container">
      <div className="upper-section">
        <div className="upper-section1">
            <p>Shivang Sharma</p>
            <p onClick={()=>handleLogout()} >Logout</p>
        </div>
        <div className="upper-section2">
            <h1>Projects</h1>
            <div className='addProject' >
                <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                <button onClick={()=>addNewProject()}>Add</button>
            </div>
        </div>
      </div>
      <div className="lower-section">
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
