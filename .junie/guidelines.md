# Sample Junie Todo Application Guidelines

## Project Overview

This is a Kanban-style Todo application built with React and TypeScript. The application allows users to manage tasks through a visual board with three lanes: TODO, DOING, and DONE. Tasks can be created, moved between lanes via drag-and-drop, marked as complete, and deleted.

### Core Features

- **Task Management**: Create, complete, and delete tasks
- **Kanban Board**: Organize tasks in TODO, DOING, and DONE lanes
- **Drag and Drop**: Move tasks between lanes using intuitive drag-and-drop
- **Persistent Storage**: Tasks are saved in localStorage for persistence between sessions
- **Type Safety**: Implemented with TypeScript for robust type checking

### Technical Architecture

The application follows a component-based architecture using React functional components with hooks:

1. **App Component**: The main container component that:
   - Manages the global state (todos)
   - Handles data persistence with localStorage
   - Provides functions for task operations (add, move, toggle, delete)
   - Implements drag-and-drop functionality

2. **TodoForm Component**: Handles the creation of new tasks

3. **TodoLane Component**: Represents a lane (TODO, DOING, DONE) and contains:
   - A title
   - A list of TodoItem components
   - Drag-and-drop drop zone functionality

4. **TodoItem Component**: Represents an individual task with:
   - Task text
   - Completion checkbox
   - Delete button
   - Drag-and-drop drag functionality

### Data Model

The core data structure is the `Todo` interface:

```typescript
interface Todo {
  id: number;      // Unique identifier
  text: string;    // Task description
  completed: boolean; // Completion status
  status: 'TODO' | 'DOING' | 'DONE'; // Current lane
}
```

### State Management

The application uses React's useState hook for state management:
- The todos array is the primary state
- State is persisted to localStorage using useEffect
- State is updated through specific functions (addTodo, moveTodo, toggleComplete, deleteTodo)

### UI/UX Considerations

- Japanese labels are used for buttons ("追加" for Add, "削除" for Delete)
- The interface is organized in a Kanban-style board for intuitive task management
- Drag-and-drop provides a natural way to move tasks between different stages

### Development Guidelines

1. **TypeScript Usage**:
   - Always define interfaces for component props
   - Use proper type annotations for functions and variables
   - Leverage TypeScript's union types for status fields

2. **Component Structure**:
   - Keep components focused on a single responsibility
   - Use functional components with hooks
   - Pass only necessary props to child components

3. **State Management**:
   - Keep state at the appropriate level (usually in App.tsx)
   - Use callback functions to modify state from child components
   - Ensure state updates are immutable

4. **Code Style**:
   - Follow consistent naming conventions
   - Add comments for complex logic
   - Structure components with props interface at the top

This project serves as a practical example of a React TypeScript application with drag-and-drop functionality and local storage persistence.
