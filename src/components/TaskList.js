import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function TaskList({ tasks, setTasks, setSelectedTask }) {
  const { filter, filterDescription } = useParams();
  
  // Limpia el detalle al cambiar de filtro o cuando no hay tareas visibles
  useEffect(() => {
    setSelectedTask(null);
  }, [filter, filterDescription, setSelectedTask]);

  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      let matchesFilter = true;
      switch (filter) {
        case "today":
          matchesFilter = task.expirationDate === todayISO; 
          break;
        case "planned":
          matchesFilter = task.expirationDate !== "" && !task.isCompleted;
          break;
        case "important":
          matchesFilter = task.isImportant && !task.isCompleted;
          break;
        case "completed":
          matchesFilter = task.isCompleted;
          break;
        case "pending":
          matchesFilter = !task.isCompleted;
          break;
        default:
          matchesFilter = true;
      }

      const matchesSearch = filterDescription
        ? task.description.toLowerCase().includes(filterDescription.toLowerCase())
        : true;

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, filterDescription, todayISO]); // recalcula solo si cambian estas dependencias

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );

    // Si la tarea seleccionada es la que se modificó, actualiza el detalle también
    setSelectedTask((prev) => {
      if (prev && prev.id === id) {
        return { ...prev, isCompleted: !prev.isCompleted };
      }
      return prev;
    });
  };

  const handleToggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t))
    );

    //Si la tarea seleccionada es la que se modificó, actualiza el detalle también
    setSelectedTask((prev) => {
      if (prev && prev.id === id) {
        return { ...prev, isImportant: !prev.isImportant };
      }
      return prev;
    });
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const listTitle = 
    filter === "today" ? "Hoy" 
    : filter === "important" ? "Importante"
    : filter === "planned" ? "Planeado"
    : filter === "pending" ? "Pendientes"
    : filter === "completed" ? "Completadas"
    : "Todas";

  return (
    <div className="task-list flex-grow-1 overflow-auto pe-2">
      <div className="d-flex justify-content-center align-items-center mb-3 text-primary">
        <FontAwesomeIcon
          icon={faHome}
          className="me-2 c-primary"
          fontSize={"1.5rem"}
        />
        <h3 className="m-0 c-primary">{listTitle}</h3>
      </div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onSelect={handleSelectTask}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center text-secondary mt-4">
          No hay tareas disponibles.
        </p>
      )}
    </div>
  );
}

export default React.memo(TaskList);