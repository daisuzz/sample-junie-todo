import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoLane from '../TodoLane';

// Mock the react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => 
    children({
      innerRef: jest.fn(),
      droppableProps: {},
      placeholder: null,
    }),
  Draggable: ({ children }) => 
    children({
      innerRef: jest.fn(),
      draggableProps: {},
      dragHandleProps: {},
    }),
}));

// Mock the TodoItem component
jest.mock('../TodoItem', () => {
  return function MockTodoItem({ todo }: { todo: { id: number; text: string; completed: boolean; status: string } }) {
    return <div data-testid={`todo-item-${todo.id}`}>{todo.text}</div>;
  };
});

describe('TodoLane Component', () => {
  const mockTodos = [
    { id: 1, text: 'Test Todo 1', completed: false, status: 'TODO' },
    { id: 2, text: 'Test Todo 2', completed: true, status: 'TODO' }
  ];

  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('renders lane title correctly', () => {
    render(
      <TodoLane 
        laneId="TODO"
        title="TODO Lane"
        todos={mockTodos} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the lane title is rendered
    expect(screen.getByText('TODO Lane')).toBeInTheDocument();
  });

  test('renders empty message when no todos', () => {
    render(
      <TodoLane 
        laneId="TODO"
        title="TODO Lane"
        todos={[]} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the empty message is rendered
    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });

  test('renders list of todos', () => {
    render(
      <TodoLane 
        laneId="TODO"
        title="TODO Lane"
        todos={mockTodos} 
        toggleComplete={mockToggleComplete} 
        deleteTodo={mockDeleteTodo} 
      />
    );

    // Check if the todos are rendered
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});
