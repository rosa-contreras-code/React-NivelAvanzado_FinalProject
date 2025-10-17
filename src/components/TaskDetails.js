import React from "react";
import { useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCalendarDays, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ButtonDelete = styled.button`
  background-color: #404040;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 5px;

  /* transición */
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #94a6bd;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95); /* efecto al presionar */
  }
`;

function TaskDetails({ selectedTask, setSelectedTask, setTasks }) {
  // Guardar automáticamente en el local cuando cambia una tarea seleccionada
  useEffect(() => {
    if (!selectedTask) return; // evita ejecutar si no hay tarea seleccionada
    setTimeout(() => {
      setTasks((prev) => {
        localStorage.setItem("tasks", JSON.stringify(prev));
        return prev;
      });
    }, 0);
  }, [selectedTask, setTasks]);

  const handleDelete = () => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((t) => t.id !== selectedTask.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setSelectedTask(null);
  };

  const updateTaskField = (field, value) => {
    // Actualiza en la lista global
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === selectedTask.id ? { ...t, [field]: value } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    // Actualiza en la vista local
    setSelectedTask((prev) => ({ ...prev, [field]: value }));
  };

  //Muestra mensaje por defecto
  if (!selectedTask) {
    return (
      <div className="text-center text-muted mt-5">
        <FontAwesomeIcon icon={faInfoCircle} className="fa-2x mb-3" />
        <p>Selecciona una tarea para ver o editar los detalles.</p>
      </div>
    );
  }

  return (
    <Card
      className="p-3 shadow-sm border-0 h-100"
      style={{ backgroundColor: "var(--color-footer)" }}
    >
      <Card.Body className="d-flex flex-column h-100">
        <Form
          className="flex-grow-1 d-flex flex-column"
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              checked={selectedTask.isCompleted}
              onChange={(e) => updateTaskField("isCompleted", e.target.checked)}
              className="checkbox"
            />
            <Form.Control
              type="text"
              value={selectedTask.description}
              onChange={(e) => updateTaskField("description", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // evita submit
                }
              }}
              style={{
                color: "var(--color-primary)",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} />
            <Form.Control
              type="date"
              value={selectedTask.expirationDate || ""}
              onChange={(e) =>
                updateTaskField("expirationDate", e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Nota"
              rows={3}
              value={selectedTask.notes || ""}
              onChange={(e) => updateTaskField("notes", e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Importante"
            aria-label="Importante"
            checked={selectedTask.isImportant}
            onChange={(e) => updateTaskField("isImportant", e.target.checked)}
            className="mb-2"
          />

          <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <Card.Text className="text-secondary small my-0">
              Creada el {selectedTask.creationDate}
            </Card.Text>
            <ButtonDelete onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TaskDetails;
