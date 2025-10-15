import { Navbar, Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";
import { faMagnifyingGlass, faBars  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

function Header( {onToggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/");
  const pathSearch = pathParts[3] || "";
  const [searchValue, setSearchValue] = useState(pathSearch);
  const currentFilter = pathParts[2] || "all";

  useEffect(() => {
    // Cuando cambie el filtro, limpiar la caja
    setSearchValue("");
  }, [currentFilter]);

   const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchValue(e.target.value); // mantener lo que escribe el usuario
    if (value) {
      navigate(`/tasks/${currentFilter}/${value}`);
    } else {
      navigate(`/tasks/${currentFilter}`);
    }
  };

  return (
    <Navbar className='navbar py-2'>
      
      <Container fluid className="d-flex align-items-center justify-content-center">
        <Button 
          variant="secondary" 
          className="d-md-none me-2"
          onClick={onToggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="search-box position-relative flex-grow-1">
          <Form.Control
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearch}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;