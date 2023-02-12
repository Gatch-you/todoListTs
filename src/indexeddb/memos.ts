import Dexie from 'dexie';

export interface TodoRecord {
    inputValue: string;
    id: number;
    checked: boolean;
};

const detabase = new Dexie('todolist-ts');
// database.version(1).stores({ todos: '&inputValue'});
// const todos: Dexie.Table<TodoRecord, string > database.table()
