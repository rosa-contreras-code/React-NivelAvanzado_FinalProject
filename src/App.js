import {React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//Style
import { Container, Row, Col } from "react-bootstrap";
import './App.css';

//Components
import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";


function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch {
      console.error("Error al parsear las tareas del localStorage");
      return [];
    }
  });
   // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (formdata) =>{
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = {...formdata, id: newId};
    console.log("tarea nueva: ", newTask);
    setTasks((prevTasks) => [...prevTasks,newTask]);
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light px-0">
        <Header />
        <Container fluid className="main-layout px-0">
          <Row className="g-0 flex-grow-1 w-100">
            <Col xs={"auto"} className="border-end p-0">
              <Sidebar  tasks={tasks}/>
            </Col>
            <Col className="p-4 flex-grow-1 bg-ligth d-flex flex-column">
              <main className="p-4 flex-grow-1">
                <Routes>
                  <Route path="/tasks/" element={<Navigate to="/tasks/all" />} />
                  <Route path="/tasks/:filter/:filterDescription?" element={<TaskList tasks={tasks} setTasks={setTasks} setSelectedTask={setSelectedTask} />} />
                </Routes>
                <TaskForm onSubmit={handleSubmit}/>
              </main>
            </Col>
            <Col xs={3} className="p-0 border-start shadow-sm bg-light">
              <TaskDetails selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={setTasks} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
