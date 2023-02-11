import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  const [inputValue, setInputValue] = useState("");
//アプリケーションの入力のテキストを取得する。

  const [todos, setTodos] = useState<Todo[]>([]);
//hooksの書き方であり
//<Todo[]>([])と書くことによって以下で定義したTodoの３つのプロパティ以外のinputがあった場合エラーを吐くようにしている。
//これがTypescriptの強みである


  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };
  //↑入力された型指定のオブジェクト
  //上のconst [inputValue, setInputValue] = useState("");からこのTodoにinputValueへ渡される。

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value);
    //ブラウザのコンソールからe.target.valueを見て持ってくる。だいたいこれらしい。
    //持ってきて7行目のinputValueに格納される。
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //↑エンターキーを押すとページがリロードされないようにしている。

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false
    };
    //↑Todoの型をコピーして新しく作成していく。
    //inputValueは7行めに取得したもの idはユニークなものが良いが、今回は簡単なものなので.lengthにしている。

    setTodos([newTodo, ...todos]);
    //コピーしたnewTodoの内容を配列として入れていく。(スプレット構文？)

    setInputValue("");
    //作成ののちはテキストボックスを空にしたいからこれを書く
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
        //   ↑前のinVal     ↑編集で打ち込んだinval
      }
      //todo.idと元からのidのnumberが一致した時のみ編集を可能にする処理
      return todo;
      // newTodosは型が空であるから、todos.map((todo)の方に合わせるようにreturn todo;を返している。
    });
    setTodos(newTodos);
  };

  const handlechecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h1>Todo List with Typescript</h1>
        <form onSubmit = {(e) => handleSubmit(e)}>
          <label className='inputText'>
            <input 
              type = "text" 
              onChange = {(e) => handleChange(e)} 
              // eventのe        handlechangeは上で自分で定義した関数
              className = "inputText" />
          </label>
          <input type = "submit" value = "作成" className = "submitButton" />
        </form>
        <ul className = "todoList">
          {todos.map((todo) => (
            <li  key = {todo.id}>
            {/* //liの中でtodoという引数にidのキーを渡すことでエラーを防いでいる。 */}
              <input 
                type = "text" 
                onChange = {(e) => handleEdit(todo.id, e.target.value)}
                className = "inputText" 
                value = {todo.inputValue} 
                disabled = {todo.checked}
              />
              <input 
                type = "checkbox" 
                onChange = {(e) => handlechecked(todo.id, todo.checked)}
                className = "inputText" 
              />
              <button onClick = {() => handleDelete(todo.id)}>削除</ button>
            </ li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
