import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
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

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('renders app title', () => {
    render(<App />);
    expect(screen.getByText('Todoリスト')).toBeInTheDocument();
  });

  test('renders TodoForm and TodoLanes', () => {
    render(<App />);

    // Check if TodoForm is rendered
    expect(screen.getByPlaceholderText('新しいタスクを入力...')).toBeInTheDocument();

    // Check if TodoLanes are rendered
    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByText('DOING')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<App />);

    // Get the input element and add button
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    const addButton = screen.getByText('追加');

    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Check if the new todo is rendered
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<App />);

    // Add a new todo
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    const addButton = screen.getByText('追加');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Get the checkbox and toggle it
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if localStorage.setItem was called with updated todos
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3); // Once on initial render, once for adding, once for toggling
  });

  test('deletes a todo', () => {
    render(<App />);

    // Add a new todo
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    const addButton = screen.getByText('追加');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Get the delete button and click it
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    // Check if the todo is removed
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });

  test('loads todos from localStorage', () => {
    // Set up localStorage with a todo
    const mockTodos = [
      { id: 1, text: 'Saved Todo', completed: false, status: 'TODO' }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));

    render(<App />);

    // Check if the saved todo is rendered
    expect(screen.getByText('Saved Todo')).toBeInTheDocument();
  });
});
