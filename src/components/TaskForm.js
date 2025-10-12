
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

const Button1 = styled.button`
    display: inline-block;
    background-color: #587081;
    color: white;
    padding: 13px;
    margin: 0 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    justify-content: center
    
    &:hover {
      background-color: #a0a0ba;
    }
  `;


function TaskForm({onSubmit}) {
  const today = new Date().toLocaleDateString("es-MX");
  // const [autoId, setAutoId] = useState(4);
  const [formData, setFormData] = useState({
    id: 0,
    creationDate: today,
    description: "",
    isCompleted: false,
    isImportant: false,
    expirationDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (formData.description.length > 0) {
      console.log("Datos enviados", formData);
      onSubmit(formData);

    }
  }

  

  return (
    <Form className=" d-flex  mt-auto" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="description"
        placeholder="Agregar una tarea"
        value={formData.description}
        onChange={handleChange}
      />
      <Button1 onClick={handleSubmit} type="submit">
        <FontAwesomeIcon icon={faPlus} className={`fs-5`} color="#a0a0ba" />
      </Button1>
    </Form>
  );
}

export default TaskForm;
