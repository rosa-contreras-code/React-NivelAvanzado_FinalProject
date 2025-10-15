
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const ButtonAdd = styled.button`
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

    /* TRANSICIÓN */
   transition: background-color 0.3s ease, transform 0.2s ease;
    
    &:hover {
      background-color: #94a6bd;
      transform: scale(1.05);
    }
      
    &:active {
    transform: scale(0.95); /* efecto al presionar */
  }
  `;


function TaskForm({onSubmit}) {
  const today = new Date()/*.toLocaleDateString("es-MX")*/;
  const todayISO = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const location = useLocation();
  const inputRef = useRef(null); // ref para el input

  // Extraemos filtro de la URL
  const pathParts = location.pathname.split("/");
  const currentFilter = pathParts[2] || "all";

  const [formData, setFormData] = useState({
    id: 0,
    creationDate: "",
    description: "",
    isCompleted: false,
    isImportant: false,
    expirationDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (formData.description.trim().length === 0) return;

    // Crear la nueva tarea
    let newTask = {
      ...formData,
      creationDate: today.toLocaleDateString("es-MX"),
      expirationDate: formData.expirationDate,
      isCompleted: formData.isCompleted,
      isImportant: formData.isImportant,
    };

    // Ajustar campos según el filtro
    if (currentFilter === "today" || currentFilter === "planned") {
      newTask.expirationDate = todayISO;
    }
    if (currentFilter === "completed") {
      newTask.isCompleted = true;
    }
    if (currentFilter === "important") {
      newTask.isImportant = true;
    }

    onSubmit(newTask);
    // Limpiar formulario
    setFormData({
      id: 0,
      creationDate: "",
      description: "",
      isCompleted: false,
      isImportant: false,
      expirationDate: "",
      notes: "",
    });
    inputRef.current.focus(); // mantiene el foco
  }

  

  return (
    <Form className=" d-flex  mt-auto add-task-form" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="description"
        placeholder="Agregar una tarea"
        value={formData.description}
        onChange={handleChange}
        ref={inputRef}
        autoFocus
      />
      <ButtonAdd onClick={handleSubmit} type="submit">
        <FontAwesomeIcon icon={faPlus} className={`fs-5`}/>
      </ButtonAdd>
    </Form>
  );
}

export default TaskForm;
