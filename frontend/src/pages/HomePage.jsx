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
  const fetchProjects=async()=>{
    const {data}=await axios.get('/backend/api/projects');
    console.log(data);
    setProjects(data)
    
  }
  useEffect(() => {
    // Fetch user and project details
    
    fetchProjects();
  }, []);

  const addNewProject=async()=>{
    try {
      const formData=new FormData();
      formData.set("title",title)
      const{data}=await axios.post('/backend/api/projects',{title})
      fetchProjects();
      setTitle("")
      
    } catch (error) {
      alert(error.response.data.message)
    }

  }
  return (
    <div className="container">
      <div className="upper-section">
        <div className="upper-section1">
            <h2>Todo</h2>
        </div>
        <div className="upper-section2">
            <h1>Projects</h1>
            <div className='addProject' >
                <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <button onClick={()=>addNewProject()}>Add</button>
            </div>
        </div>
      </div>
      <div className="lower-section">
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} fetchProjects={fetchProjects} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
