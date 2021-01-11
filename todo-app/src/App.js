import './App.css';
import React from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo({todo, index, completeTodo, removeTodo}){
  return(
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
};

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);
  
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    setIncompleted(prevCount => prevCount + 1);
  };
  
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setCompleted(prevCount => prevCount + 1);
    setIncompleted(prevCount => prevCount - 1);
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
    setCompleted(prevCount => prevCount - 1);
  };

  const [completed, setCompleted] = React.useState(0)

  const [incompleted, setIncompleted] = React.useState(3)


  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo,index) => (
          <Todo
            key = {index}
            index = {index}
            todo = {todo}
            completeTodo = {completeTodo}
            removeTodo = {removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="complete">Complete {completed}</div>
      <div className="complete">Incomplete {incompleted}</div>
    </div>
  );
}

export default App;
