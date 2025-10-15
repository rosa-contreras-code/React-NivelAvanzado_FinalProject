import { Modal } from 'react-bootstrap';
import TaskDetails from './TaskDetails';

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
