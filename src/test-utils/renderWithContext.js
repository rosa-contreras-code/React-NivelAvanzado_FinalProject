import React from 'react';
import { render } from '@testing-library/react';
import { TaskContext } from '../context/TaskContext';

export function renderWithContext(ui, { providerProps, ...renderOptions }) {
  return render(
    <TaskContext.Provider value={{ ...providerProps }}>
      {ui}
    </TaskContext.Provider>,
    renderOptions
  );
}
