import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import './App.css';
//Components
import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import TaskDetailsModal from "./components/TaskDetailsModal";
import Footer from "./components/Footer";


function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  //Reponsividad
  const [showSidebar, setShowSidebar] = useState(false);
  //Lista
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

  //Agregar tarea
  const handleSubmit = (formdata) => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = { ...formdata, id: newId };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light px-0">
        <Header onToggleSidebar={() => setShowSidebar(true)} />

        {/* Sidebar en pantallas pequeñas */}
        {window.innerWidth < 768 && (
          <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar tasks={tasks} onSelect={() => setShowSidebar(false)} />
            </Offcanvas.Body>
          </Offcanvas>
        )}

        <Container fluid className="main-layout px-0 flex-grow-1">
          <Row className="g-0 flex-grow-1 w-100">
            <Col xs={12} md="auto" className="border-end p-0 d-none d-md-block">
              <Sidebar tasks={tasks} />
            </Col>
            <Col
              xs={12}
              md
              className="p-4 flex-grow-1 bg-ligth d-flex flex-column"
            >
              <main className="p-4 flex-grow-1  d-flex flex-column">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/tasks/all" replace />}
                  />
                  <Route
                    path="/tasks/"
                    element={<Navigate to="/tasks/all" />}
                  />
                  <Route
                    path="/tasks/:filter/:filterDescription?"
                    element={
                      <TaskList
                        tasks={tasks}
                        setTasks={setTasks}
                        setSelectedTask={setSelectedTask}
                      />
                    }
                  />
                </Routes>
                <TaskForm onSubmit={handleSubmit} />
              </main>
            </Col>
            <Col
              xs={12}
              md={"auto"}
              className="p-0 border-start shadow-sm bg-light  d-none d-md-flex"
            >
              <TaskDetails
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                setTasks={setTasks}
              />
            </Col>
          </Row>
        </Container>

        {/* TaskDetails modal móvil */}
        {selectedTask && window.innerWidth < 768 && (
          <TaskDetailsModal
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            setTasks={setTasks}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
