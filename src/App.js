import {React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
  const today = new Date().toLocaleDateString('es-MX');
  //  Estado global de tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      creationDate: today,
      description: "Comprar despensa",
      isCompleted: false,
      isImportant: true,
      expirationDate: today,
      notes: "Test"
    },
    {
      id: 2,
      creationDate: today,
      description: "Llamar al dentista",
      isCompleted: true,
      isImportant: false,
      expirationDate: today,
      notes: "Test1"
    },
  ]);
   const handleSubmit = (formdata) =>{
    const newTask = {...formdata, id: tasks.length +1};
    setTasks((prevTasks) => [...prevTasks,newTask]);
    console.log("tarea agregada", newTask);
    
  }
  //F
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light px-0">
        <Header />
        <Container fluid className="flex-grow-1 px-0">
          <Row className="g-0">
            <Col xs={"auto"} className="border-end p-0">
              <Sidebar  tasks={tasks}/>
            </Col>
            <Col className="p-4 flex-grow-1 bg-dark">
              <main className="p-4 h-100">
                <Routes>
                  <Route path="/tasks/" element={<Navigate to="/tasks/all" />} />
                  <Route path="/tasks/:filter" element={<TaskList tasks={tasks} setTasks={setTasks} setSelectedTask={setSelectedTask} />} />
                  {/* Formulario de creación o edición */}
                  {/* <Route path="/new" element={<TaskForm />} /> */}
                  {/* <Route path="/edit/:id" element={<TaskForm />} /> */}
                </Routes>
                <TaskForm onSubmit={handleSubmit}/>
              </main>
            </Col>
            <Col xs={3} className="p-0 border-start shadow-sm">
              <TaskDetails selectedTask={selectedTask} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
