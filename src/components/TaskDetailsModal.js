import TaskDetails from './TaskDetails';
import { Modal } from 'react-bootstrap';

//Modal para edición en dispositivos pantallas pequeñas
function TaskDetailsModal({ selectedTask, setSelectedTask, setTasks }) {
  return (
    <Modal
      show={!!selectedTask}
      onHide={() => setSelectedTask(null)}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskDetails
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setTasks={setTasks}
        />
      </Modal.Body>
    </Modal>
  );
}

export default TaskDetailsModal;
