import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBox({ searchValue, onSearchChange, onSearch }) {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Buscar tarea..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/* visible solo en pantallas pequeñas para mostrar el sidebar*/}
      <Button 
        variant="outline-secondary" 
        onClick={onSearch} 
        className="d-md-none"
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </InputGroup>
  );
}

export default SearchBox;
