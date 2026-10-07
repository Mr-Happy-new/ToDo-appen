import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);

  // Lägg till ny todo
  const addTodo = (text) => {
    if (text.trim() === '') return; 
    
    const newTodo = { 
      id: crypto.randomUUID(), 
      text: text, 
      isCompleted: false
    };
    setTodoList([...todoList, newTodo]);
  };

  // Ändra status
  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Ta bort todo
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App-container">
      <h1>Min Todo App</h1>
      <TodoForm onAddTodo={addTodo} />

      <ul className="todo-list">  
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleComplete}
            onDeleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

// Komponent för inmatningsformulär
function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Skriv en uppgift..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

// Komponent för enskild todo-rad
function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <span onClick={() => onToggleComplete(todo.id)} className="todo-text">
        {todo.isCompleted ? <s>{todo.text}</s> : todo.text}
      </span>
      <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">Ta bort</button>
    </li>
  );
}

export default App;
