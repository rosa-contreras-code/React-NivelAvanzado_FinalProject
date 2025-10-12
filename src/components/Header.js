import { Navbar, Container, Form } from 'react-bootstrap';


function Header(tasks, setTasks,) {
  return (
    <Navbar className='navbar py-2'>
      <Container fluid className="d-flex justify-content-center">
       <Form className="w-sm-auto w-25 d-flex justify-content-center align-items-center">
            <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Search"/>
            {/* <FontAwesomeIcon icon={'magnifying-glass'} /> */}
          </Form>
      </Container>
    </Navbar>
  );
}

export default Header;