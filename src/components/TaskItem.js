import React, { useState } from "react";
import { Card, Form} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar} from "@fortawesome/free-regular-svg-icons";

function TaskItem({ task, onSelect, onToggleComplete, onDelete, onToggleImportant }) {
   const [isImportant, setIsImportant] = useState(task.isImportant);
  
   const handleToggle = () => {
    const newValue = !isImportant;
    setIsImportant(newValue);
    if (onToggleImportant) {
      onToggleImportant(task.id, newValue);
    }
  };

  return (
    <Card 
      className="mb-2 shadow-sm task-item"
      onClick={() => onSelect(task)}
      style={{
        cursor: "pointer",
      }}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          {/* Checkbox para marcar como completada */}
          <Form.Check
            type="checkbox"
            checked={task.isCompleted}
            onChange={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
          />

          {/* Descripción de la tarea */}
          <div>
            <Card.Title
              className={`mb-0 ${task.isCompleted ? "text-decoration-line-through text-muted" : ""}`}
            >
              {task.description}
            </Card.Title>
            <small className="text-secondary">
              {task.expirationDate ? `Vence: ${task.expirationDate}` : ""}
            </small>
          </div>
        </div>

        {/* Botón eliminar (ícono FontAwesome) */}
        {/* <Button
          variant="light"
          size="sm"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   onDelete(task.id);
          // }}
        >
        </Button> */}

         <FontAwesomeIcon
        icon={isImportant ? faSolidStar : faRegularStar}
        className={`fs-5 isImportantIcon ${isImportant ? "text-warning" : "text-secondary"}`}
        style={{ cursor: "pointer" }}
        onClick={() => {handleToggle();}}
        title={isImportant ? "Marcado como importante" : "Marcar como importante"}
      />
        
      </Card.Body>
    </Card>
  );
}

export default TaskItem;
