import './App.css';
import React from 'react';

function Todo({todo, index, completeTodo, removeTodo, redoTodo, setPriority}){
  return(
    <div 
      className="todo"
      style={{ backgroundColor: todo.isPriority ? "yellow" : "white", textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      Task {index+1}: {todo.text}
      <div>
        <button className = "button buttoncomplete" onClick={() => completeTodo(index)}>Complete</button>
        <button className = "button buttonredo" onClick={() => redoTodo(index)}>Redo Todo</button>
        <button className = "button buttonpriority" onClick={() => setPriority(index)}>!</button>
        <button className = "button buttondelete" onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form className ="todoform" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder = "Insert New Todo"
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "blah blah",
      isCompleted: false,
      isPriority: false
    },
    {
      text: "asdf",
      isCompleted: false,
      isPriority: false
    },
    {
      text: "done",
      isCompleted: false,
      isPriority: false
    }
  ]);
  
  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false, isPriority: false }];
    setTodos(newTodos);
    setIncompleted(prevCount => prevCount + 1);
  };
  
  const completeTodo = index => {
    const newTodos = [...todos];
    
    if(newTodos[index].isCompleted == false){
      setCompleted(prevCount => prevCount + 1);
      setIncompleted(prevCount => prevCount - 1);
    };

    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  
  const redoTodo = index => {
    const newTodos = [...todos];
    
    if(newTodos[index].isCompleted == true){
      setCompleted(prevCount => prevCount - 1);
      setIncompleted(prevCount => prevCount + 1);
    };
    
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };
  
  const setPriority = index => {
    const newTodos = [...todos];
    
    if(newTodos[index].isPriority == false){
      newTodos[index].isPriority = true;
    } else if(newTodos[index].isPriority == true){
      newTodos[index].isPriority = false;
    };
    
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
    const newTodos = [...todos];
    
    if(newTodos[index].isCompleted == true){
      setCompleted(prevCount => prevCount - 1);
    } else{
      setIncompleted(prevCount => prevCount - 1);
    };

    newTodos.splice(index, 1);
    setTodos(newTodos);
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
            redoTodo = {redoTodo}
            setPriority = {setPriority}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <div className="completewrapper">
          <div className="complete">Complete: {completed}</div>
          <div className="complete">Incomplete: {incompleted}</div>
        </div>
      </div>    
    </div>
  );
}

export default App;
