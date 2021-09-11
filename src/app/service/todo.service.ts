import { EventEmitter } from "@angular/core";
import { Todo } from "../model/Todo";

export class TodoService{
    private todos: Todo[] = [
        {title: "First todo", desc: "first todo", completed: false, createdDate: new Date()},
        {title: "Second todo", desc: "Second todo", completed: true, createdDate: new Date()}
    ]
    todosObservable = new EventEmitter<Todo[]>();
    selectedTodoObs = new EventEmitter<Todo>();

    constructor(){
    }

    getTodos () : Todo[]{
        return this.todos.slice();
    }

    addTodo(todo: Todo){
        this.todos.push(todo);
        this.todosObservable.emit(this.todos.slice());
    }
    
}