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
    completedTodos: Todo[] = [];
    unCompletedTodos: Todo[] = [];

    selectedTodo?: Todo;    


    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todoService.selectedTodoObs.subscribe((todo)=>{
            this.selectedTodo = todo;
        });
        this.completedTodos = this.todoService.completedTodos;
        this.unCompletedTodos = this.todoService.unCompletedTodos;
    }

    
    
    addTodo(form: NgForm){
        if(form.valid){
            this.todoService.addTodo({title: form.value.todoData.todoTitle, desc: "", completed: false, createdDate: new Date()})
            form.reset();
        }
    }
    aa(){
        console.log(true)
    }
}