// src/pages/ProjectDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await axios.get(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProject(response.data);
      setTitle(response.data.title);
      setTodos(response.data.todos);
    };
    fetchProjectData();
  }, [projectId]);

  const handleTitleEdit = async () => {
    setIsEditing(false);
    await axios.put(`/api/projects/${projectId}`, { title }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  };

  return (
    <div className="project-detail-container">
      <div className="upper-section">
        <nav>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleEdit}
              />
            ) : (
              <h3 onClick={() => setIsEditing(true)}>{title}</h3>
            )}
          </div>
        </nav>
      </div>
      <div className="lower-section">
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-card">
              <p>{todo.description}</p>
              <small>Status: {todo.status ? "Completed" : "Pending"}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
