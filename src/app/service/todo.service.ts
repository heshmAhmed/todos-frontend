import { EventEmitter } from "@angular/core";
import { Todo } from "../model/Todo";

export class TodoService{
    private todos: Todo[] = [
        {title: "", desc: "", complieted: false, createdDate: new Date()}
    ]
    todosObservable = new EventEmitter<Todo[]>();

    getTodos () : Todo[]{
        return this.todos.slice();
    }

    addTodo(todo: Todo){
        this.todos.push(todo);
        this.todosObservable.emit(this.todos.slice());
    }
    
}