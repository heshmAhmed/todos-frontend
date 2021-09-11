import { EventEmitter } from "@angular/core";
import { Todo } from "../model/Todo";

export class TodoService{
    private todos: Todo[] = [
        {title: "First todo", desc: "first todo", completed: false, createdDate: new Date()},
        {title: "Second todo", desc: "Second todo", completed: true, createdDate: new Date()},
        {title: "Third todo", desc: "Third todo", completed: false, createdDate: new Date()},
        {title: "Fourth todo", desc: "Fourth todo", completed: true, createdDate: new Date()}

    ]
    public completedTodos: Todo[] = [];
    public unCompletedTodos: Todo[] = [];
    public selectedTodoObs = new EventEmitter<Todo>();

    constructor(){
        this.setTodosLists();
        this.todos = [];
    }

    setTodosLists(){
        this.todos.map((todo)=>{
            if(todo.completed)
                this.completedTodos.push(todo);
            else 
                this.unCompletedTodos.push(todo);
        })
    }

    addTodo(todo: Todo){
        this.unCompletedTodos.push(todo);
        console.log(this.completedTodos);
        console.log(this.unCompletedTodos);
    }

    delete(todo: Todo){
        if(todo.completed){
            let index = this.completedTodos.indexOf(todo, 0);
            this.completedTodos.splice(index, 1);
        }
        else{
            let index = this.unCompletedTodos.indexOf(todo, 0);
            this.unCompletedTodos.splice(index, 1);
        }
    }
    update(todo: Todo){
        
    }
    
}