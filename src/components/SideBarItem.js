import { NavLink } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarItem({to, icon, label, count, onClick}) {
 
    return (
        <NavLink 
            to= {to} 
            className={({ isActive }) =>`nav-link d-flex justify-content-between align-items-center ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
          <div>
            <FontAwesomeIcon icon={icon} className="me-2"/>
            {label}
          </div>
            
           {count > 0 && <Badge  bg="none" className="badge-count">{count}</Badge>}
        </NavLink>
    );
}

export default SidebarItem;
