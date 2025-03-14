import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import './TodoComponents.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  status: 'TODO' | 'DOING' | 'DONE';
}

interface TodoLaneProps {
  laneId: string;
  title: string;
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoLane: React.FC<TodoLaneProps> = ({ laneId, title, todos, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-lane">
      <h2>{title}</h2>
      <Droppable droppableId={laneId} type="TASK">
        {(provided) => (
          <ul
            className="todo-lane-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.length === 0 ? (
              <p className="empty-message">タスクがありません</p>
            ) : (
              todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TodoLane;
