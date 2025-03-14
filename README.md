# React Todo Application with TypeScript

A simple Todo application built with React and TypeScript.

## Features

- Add new tasks
- Mark tasks as complete
- Delete tasks
- Persistent storage using localStorage
- Type safety with TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later recommended)
- TypeScript knowledge (basic understanding)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/sample-junie-todo.git
   cd sample-junie-todo
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

- **Adding a task**: Type your task in the input field and click "追加" (Add) or press Enter
- **Completing a task**: Click the checkbox next to the task
- **Deleting a task**: Click the "削除" (Delete) button next to the task

## TypeScript Features

- Strong typing for components and props
- Interface definitions for data models
- Type-safe state management with useState<T>
- Explicit function parameter and return types

## Project Structure

```
sample-junie-todo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoComponents.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

## License

This project is open source and available under the [MIT License](LICENSE).
