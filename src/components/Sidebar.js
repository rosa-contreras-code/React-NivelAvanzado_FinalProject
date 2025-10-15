import { Container, Nav } from "react-bootstrap";
import SidebarItem from "./SideBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendarAlt,
  faCalendarCheck,
  faClock,
  faCheckCircle,
  faSun,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Sidebar.css";
import "../App.css"

function Sidebar({ tasks }) {
  const today = new Date();
  // const todayISO = new Date().toISOString().split("T")[0];
  const todayISO = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const counts = {
    today: tasks.filter(
      (t) => t.expirationDate === todayISO.toString() && !t.isCompleted
    ).length,
    planned: tasks.filter((t) => t.expirationDate !== "" && !t.isCompleted)
      .length,
    important: tasks.filter((t) => t.isImportant && !t.isCompleted).length,
    completed: tasks.filter((t) => t.isCompleted).length,
    pending: tasks.filter((t) => !t.isCompleted).length,
    all: tasks.length,
  };

  return (
    <div className="sidebar d-flex flex-column p-3">
      <Container className="mb-4 text-center">
        <FontAwesomeIcon icon={faCalendarCheck} className="logo" />
        <span className="logo ms-2">Mis Tareas</span>
      </Container>

      <Nav className="flex-column">
        <SidebarItem
          to={"/tasks/today"}
          icon={faSun}
          label={"Hoy"}
          count={counts.today}
        />
        <SidebarItem
          to={"/tasks/important"}
          icon={faStar}
          label={"Importante"}
          count={counts.important}
        />
        <SidebarItem
          to={"/tasks/planned"}
          icon={faCalendarAlt}
          label={"Planeado"}
          count={counts.planned}
        />
        <hr />
        <SidebarItem
          to={"/tasks/all"}
          icon={faHome}
          label={"Todas"}
          count={counts.all}
        />
        <SidebarItem
          to={"/tasks/pending"}
          icon={faClock}
          label={"Pendientes"}
          count={counts.pending}
        />
        <SidebarItem
          to={"/tasks/completed"}
          icon={faCheckCircle}
          label={"Completadas"}
          count={counts.completed}
        />
      </Nav>
    </div>
  );
}

export default Sidebar;
