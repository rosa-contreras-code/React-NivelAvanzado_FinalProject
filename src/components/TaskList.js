import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TaskItem from "../components/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function TaskList({ tasks, setTasks, setSelectedTask }) {
  const { filter } = useParams();
  const today = new Date().toLocaleDateString('es-MX');
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "today":
        return task.expirationDate === today.toString(); 
      case "planned":
        return task.expirationDate !== "" && !task.isCompleted;; 
      case "important":
        return task.isImportant && !task.isCompleted;
      case "completed":
        return task.isCompleted;
      case "pending":
        return !task.isCompleted;
      default:
        return true;
    }
  });

  // Funciones
  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleToggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="task-list h-75">
      <div className="d-flex justify-content-center align-items-center mb-3 text-primary">
        <FontAwesomeIcon icon={faHome} className="me-2" fontSize={"1.5rem"}/>
        <h3 className="m-0">{filter || "Todas las tareas"}</h3>
        {/* <Button variant="primary">
          <i className="fas fa-plus"></i> Nueva tarea
        </Button> */}
      </div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onSelect={handleSelectTask}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant }
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center text-secondary mt-4">No hay tareas disponibles.</p>
      )}
    </div>
  );
}

export default TaskList;
