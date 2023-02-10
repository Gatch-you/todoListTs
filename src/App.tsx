import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  const [todos, setTosos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  return (
    <div className="App">
      <div>
        <h1>Todo List with Typescript</h1>
        <form onSubmit = {() => {}}>
          <label className='inputText'>テキストを入力: 
            <input type = "text" onChange = {() => {}} className = "inputText" />
          </label>
          <input type = "submit" value = "作成" className = "submitButton" />
        </form>
      </div>
    </div>
  );
}

export default App;
