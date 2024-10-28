// src/pages/ProjectDetailPage.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./detailPage.css";
import EditIcon from "../icons/edit.svg";
const ProjectDetailPage = () => {
  const textareaRef = useRef(null);
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [showTodo,setShowTodo]=useState(false)
  const [currTodo,setCurrTodo]=useState({});
  const [addTodo,setAddTodo]=useState(false)
  const [description,setDescription]=useState("");
  const fetchProjectData = async () => {
    const { data } = await axios.get(`/backend/api/projects/${projectId}`);
    setProject(data);
    console.log(data);
    
    setTitle(data.title);
  };
  useEffect(() => {
    fetchProjectData();
   
  }, [projectId]);
  useEffect(()=>{
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  })

  const handleTitleEdit = async () => {
    try {
      console.log(title);
      if(title===""){
        alert("Title cannot be empty")
      }else{
        const {data}=await axios.put(`/backend/api/projects/${projectId}`, { title });
        fetchProjectData()
        
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  const handleTitleChange=(e)=>{
    console.log(e.target.innerText.trim());
    let str=e.target.innerText.trim();
    setTitle(str)
  }
  const addNewTodo = async() => {
    try {
      const {data}=await axios.post(`/backend/api/todos/project/${projectId}`,{description,status:false})
      console.log(data);
      fetchProjectData()
      setDescription("")
      alert("Todo added successfully")
      setAddTodo(false)
    } catch (error) {
      console.log(error);
      
      alert(error.response.data.message)
    }
  };
  const deleteTodo=async(id)=>{
    try {
      const {data}=await axios.delete(`/backend/api/todos/${id}`)
      alert(data)
      fetchProjectData()
      setShowTodo(false)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  const exportGist=async()=>{
    try {
      const {data}=await axios.post(`/backend/api/projects/${projectId}/export-gist`)
      alert(data.message+"\n"+data.gistUrl)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  const handleEditTodo=async(id,description,status)=>{
    const {data}=await axios.put(`/backend/api/todos/${id}`,{description,status})
    console.log(data);
    fetchProjectData()
    setShowTodo(false)
    setCurrTodo({})
    alert(data)
  }
  return (
    <div className="container">
      <div className="upper-section">
        <div className="upper-section1">
          <h2>Todo</h2>
        </div>
        <div className="upper-section2">
          <h1 contentEditable={true} onInput={(e) => handleTitleChange(e)}>
            {project.title}
          </h1>
          <span>
            <img
              src={EditIcon}
              onClick={() => {
                handleTitleEdit();
              }}
              alt=""
            />
          </span>
          <button className="exportGist" onClick={()=>exportGist()}>Export</button>
          <div className="addProject">
            <button className="addTodoBtn" onClick={() => setAddTodo(true)}>Add Todo</button>
          </div>
        </div>
      </div>
      <div className="lower-section">
        <div className="todo-list">
          {project.todos &&
            project.todos.map((todo) => (
              <div key={todo.id} className="todo-card" onClick={()=>{setShowTodo(true);setCurrTodo(todo)}}>
                <div className="todo-card1">
                <p className="desc" >{todo.description}</p>
                </div>
                <div className="todo-card2">
                  <p>{todo.createdDate==="null"?todo.createdDate:todo.createdDate}</p>
                  <p>{todo.status===true?"Completed":"Pending"}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {showTodo&&<div className="showTodo">
        <div className="showTodoCenter">
          <div className="showTodoCenter1">
            <h1 onClick={()=>{setShowTodo(false);setCurrTodo({})}} >close</h1>
          </div>
          <div className="showTodoCenter2">
            <p>{currTodo.description}</p>
          </div>
          <div className="showTodoCenter3">
            <p>Last update: {currTodo.updatedDate}</p>
            <p>Created at: {currTodo.createdDate}</p>
          </div>
          <div className="showTodoCenter4">
              <button onClick={()=>deleteTodo(currTodo.id)} >Delete</button>
              {currTodo.status===true? <button onClick={()=>{handleEditTodo(currTodo.id,currTodo.description,false)}} >Mark Pending</button>: <button onClick={()=>{handleEditTodo(currTodo.id,currTodo.description,true)}} >Mark Completed</button> }
          </div>
        </div>
      </div>}
      {addTodo&&<div className="addTodo">
        <div className="addTodoCenter">
          <div className="addTodoCenter1">
            <h1 onClick={()=>setAddTodo(false)} >close</h1>
          </div>
          <div className="addTodoCenter2">
            <textarea ref={textareaRef} name="" id="" value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>
          <div className="addTodoCenter3">
            <button onClick={()=>addNewTodo()} >Add</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default ProjectDetailPage;
