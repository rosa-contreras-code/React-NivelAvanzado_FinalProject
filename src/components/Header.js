import { Navbar, Container, Form } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

function Header() {
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
      {/* <Container fluid className="d-flex justify-content-center w-sm-auto w-25">
       <Form className=" d-flex justify-content-center align-items-center">
            <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Search" onChange={handleSearch}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
        </Form>
      </Container> */}
      
      <Container fluid className="d-flex justify-content-center w-sm-auto w-25">
        <div className="search-box position-relative">
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