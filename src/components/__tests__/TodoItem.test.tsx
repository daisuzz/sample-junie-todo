import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false
  };

  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('renders todo item correctly', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the todo text is rendered
    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Check if checkbox is unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('renders completed todo with line-through style', () => {
    const completedTodo = { ...mockTodo, completed: true };

    render(
      <TodoItem 
        todo={completedTodo} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the todo text has line-through style
    const todoText = screen.getByText('Test Todo');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('calls toggleComplete when checkbox is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Click the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if toggleComplete was called with the correct id
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  test('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Click the delete button
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    // Check if deleteTodo was called with the correct id
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
