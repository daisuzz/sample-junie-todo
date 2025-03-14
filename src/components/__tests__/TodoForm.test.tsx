import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from '../TodoForm';

describe('TodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    // Reset mock function before each test
    mockAddTodo.mockClear();
  });

  test('renders form with input and button', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Check if input and button are rendered
    expect(screen.getByPlaceholderText('新しいタスクを入力...')).toBeInTheDocument();
    expect(screen.getByText('追加')).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Get the input element
    const input = screen.getByPlaceholderText('新しいタスクを入力...');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Check if the input value was updated
    expect(input).toHaveValue('New Todo');
  });

  test('calls addTodo when form is submitted', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Get the input element
    const input = screen.getByPlaceholderText('新しいタスクを入力...');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Submit the form by clicking the button
    const button = screen.getByText('追加');
    fireEvent.click(button);

    // Check if addTodo was called with the correct text
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
  });

  test('clears input after form submission', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Get the input element
    const input = screen.getByPlaceholderText('新しいタスクを入力...');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Submit the form by clicking the button
    const button = screen.getByText('追加');
    fireEvent.click(button);

    // Check if the input was cleared
    expect(input).toHaveValue('');
  });

  test('does not call addTodo when form is submitted with empty input', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Submit the form by clicking the button without typing anything
    const button = screen.getByText('追加');
    fireEvent.click(button);

    // Check that addTodo was not called
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
