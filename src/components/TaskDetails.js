import { Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function TaskDetails({ selectedTask }) {
  if (!selectedTask) {
    return (
      <div className="text-center text-muted mt-5 bg-primary" >
        <i className="fas fa-info-circle fa-2x mb-3"></i>
        <p>Selecciona una tarea para ver los detalles.</p>
      </div>
    );
  }

  return (
    <Card
      className="p-3 shadow-sm border-0 h-100"
      style={{ backgroundColor: "var(--color-footer)" }}
    >
      <Card.Body className='d-flex flex-column h-100'>
        <Form className="flex-grow-1 d-flex flex-column">
          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <Form.Check type="checkbox" checked={selectedTask.isCompleted} />
            <Form.Control
              type="text"
              value={selectedTask.description}
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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder='Nota'
              rows={3}
              value={selectedTask.notes || ""}
            />
          </Form.Group>

          

          <Form.Check
            type="checkbox"
            label="Importante"
            checked={selectedTask.isImportant}
            className="mb-2"
          />

          <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
            <Card.Text className="text-secondary small">Creada el {selectedTask.creationDate}</Card.Text>
            <Button
              className="me-2"
              variant="light"
              size="sm"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   onDelete(task.id);
              // }}
            >
              <FontAwesomeIcon icon={faTrash} className="me-2" />
            </Button>
            <Button variant="light" size="sm">
              <i className="fas fa-edit me-2"></i> Editar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TaskDetails;
