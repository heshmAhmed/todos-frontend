import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Todo } from "../model/Todo";
import { TodoService } from "../service/todo.service";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrls: ["./todos-list.component.css"]
})
export class TodosListComponent implements OnInit{
    todos: Todo [] = [];
    selectedTodo?: Todo;    


    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todoService.selectedTodoObs.subscribe((todo)=>{
            this.selectedTodo = todo;
        });
        this.todoService.todosObservable.subscribe((todos: Todo[])=>{
            this.todos = todos;
        })
        this.todos = this.todoService.getTodos();
    }
    
    addTodo(form: NgForm){
        if(form.valid){
            this.todoService.addTodo({title: form.value.todoData.toodoTitle, desc: "", completed: false, createdDate: new Date()})
            console.log(this.todos);
            form.reset();
        }
    }
}