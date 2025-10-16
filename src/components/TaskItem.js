import { Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

function TaskItem({ task, onSelect, onToggleComplete, onToggleImportant }) {
  // Maneja el click en el checkbox de completado
  const handleCompleteClick = (e) => {
    e.stopPropagation(); // evita que se seleccione la tarjeta al cliquear el checkbox
    if (onToggleComplete) onToggleComplete(task.id);
  };

  // Maneja el click en la estrella
  const handleImportantClick = (e) => {
    e.stopPropagation(); // evita que se seleccione la tarjeta al cliquear la estrella
    if (onToggleImportant) onToggleImportant(task.id);
  };

  function formatDateDisplay(dateString) {
    // dateString viene en formato "YYYY-MM-DD"
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  return (
    <Card
      className="mb-2 shadow-sm task-item"
      onClick={() => onSelect && onSelect(task)}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          {/* Checkbox para marcar como completada */}
          <Form.Check
            type="checkbox"
            checked={!!task.isCompleted}
            onChange={handleCompleteClick}
          />

          {/* Descripción de la tarea */}
          <div>
            <Card.Title
              className={`mb-0 ${
                task.isCompleted
                  ? "text-decoration-line-through text-muted"
                  : ""
              }`}
            >
              {task.description}
            </Card.Title>
            <small className="text-secondary">
              {task.expirationDate
                ? `Vence: ${formatDateDisplay(task.expirationDate)}`
                : ""}
            </small>
          </div>
        </div>

        {/* Ícono de importante */}
        <FontAwesomeIcon
          icon={task.isImportant ? faSolidStar : faRegularStar}
          className={`fs-5 isImportantIcon text-secondary`}
          style={{ cursor: "pointer" }}
          onClick={handleImportantClick}
          title={
            task.isImportant
              ? "Marcado como importante"
              : "Marcar como importante"
          }
        />
      </Card.Body>
    </Card>
  );
}

export default TaskItem;
