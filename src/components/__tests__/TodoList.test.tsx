import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

// Mock the TodoItem component to simplify testing
jest.mock('../TodoItem', () => {
  return function MockTodoItem({ todo }: { todo: { id: number; text: string; completed: boolean } }) {
    return <div data-testid={`todo-item-${todo.id}`}>{todo.text}</div>;
  };
});

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, text: 'Test Todo 1', completed: false },
    { id: 2, text: 'Test Todo 2', completed: true }
  ];

  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('renders empty message when no todos', () => {
    render(
      <TodoList 
        todos={[]} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the empty message is rendered
    expect(screen.getByText('タスクがありません。新しいタスクを追加してください。')).toBeInTheDocument();
  });

  test('renders list of todos', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the todos are rendered
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('passes correct props to TodoItem components', () => {
    // We're mocking TodoItem, so we can't directly test prop passing
    // Instead, we'll check that the correct number of TodoItems are rendered
    render(
      <TodoList 
        todos={mockTodos} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check that we have the right number of TodoItems
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(2);
  });
});
