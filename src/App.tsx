import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoLane from './components/TodoLane';

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  status: 'TODO' | 'DOING' | 'DONE';
}

const App: React.FC = () => {
  // Load todos from localStorage or use empty array if none exist
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      // Add status field to existing todos if they don't have one
      return JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        status: todo.status || 'TODO'
      }));
    } else {
      return [];
    }
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string): void => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: text,
        completed: false,
        status: 'TODO'
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Move todo between lanes
  const moveTodo = (id: number, newStatus: 'TODO' | 'DOING' | 'DONE'): void => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          // Find the current status of the todo
          const currentStatus = todo.status;

          // If moving to DONE, also mark as completed
          // If moving from DONE to TODO or DOING, uncheck the todo
          let completed = todo.completed;
          if (newStatus === 'DONE') {
            completed = true;
          } else if (currentStatus === 'DONE' && (newStatus === 'TODO' || newStatus === 'DOING')) {
            completed = false;
          }

          return { ...todo, status: newStatus, completed };
        }
        return todo;
      })
    );
  };

  // Toggle todo completion status
  const toggleComplete = (id: number): void => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle drag and drop
  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;

    // If there's no destination or the item is dropped back to its original position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Only handle TASK type
    if (type === 'TASK') {
      // Get the todo ID from the draggableId
      const todoId = parseInt(draggableId);

      // Move the todo to the new lane
      moveTodo(todoId, destination.droppableId as 'TODO' | 'DOING' | 'DONE');
    }
  };

  // Filter todos by status
  const todosByStatus = (status: 'TODO' | 'DOING' | 'DONE'): Todo[] => {
    return todos.filter(todo => todo.status === status);
  };

  return (
    <div className="app">
      <h1>Todoリスト</h1>
      <TodoForm addTodo={addTodo} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="todo-lanes">
          <TodoLane
            laneId="TODO"
            title="TODO"
            todos={todosByStatus('TODO')}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
          <TodoLane
            laneId="DOING"
            title="DOING"
            todos={todosByStatus('DOING')}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
          <TodoLane
            laneId="DONE"
            title="DONE"
            todos={todosByStatus('DONE')}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
