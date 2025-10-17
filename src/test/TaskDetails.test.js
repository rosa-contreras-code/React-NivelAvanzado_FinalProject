import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskDetails from "../components/TaskDetails";
import "@testing-library/jest-dom";

describe("TaskDetails Component", () => {
  const mockTask = {
    id: 1,
    description: "Tarea inicial",
    isCompleted: false,
    isImportant: false,
    creationDate: "2025-10-16",
  };

  let setTasks;
  let setSelectedTask;

  beforeEach(() => {
    setTasks = jest.fn();
    setSelectedTask = jest.fn();
  });

  test("debe mostrar la descripción de la tarea seleccionada", () => {
    render(
      <TaskDetails
        selectedTask={mockTask}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );

    expect(screen.getByDisplayValue("Tarea inicial")).toBeInTheDocument();
  });

  test("editar descripción llama a setTasks", async () => {
    const user = userEvent.setup();

    render(
      <TaskDetails
        selectedTask={mockTask}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );

    const input = screen.getByDisplayValue("Tarea inicial");
    await user.clear(input);
    await user.type(input, "Tarea editada{enter}");

    expect(setTasks).toHaveBeenCalled();
  });

  test("checkbox 'Importante' alterna el estado", async () => {
    const user = userEvent.setup();

    render(
      <TaskDetails
        selectedTask={mockTask}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );

    // buscamos el checkbox por su label "Importante"
    const importantCheckbox = screen.getByRole("checkbox", {
      name: /importante/i,
    });

    await user.click(importantCheckbox);

    expect(setTasks).toHaveBeenCalled();
  });

});
