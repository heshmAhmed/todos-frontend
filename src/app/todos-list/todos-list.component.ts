import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Todo } from '../model/todo.model';
import { AuthService } from '../service/auth.service';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit {
  today: Date = new Date();
  completedTodos?: Todo[];
  unCompletedTodos?: Todo[];
  selectedTodo?: Todo;
  previousUrl?: string;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.selectedTodo.subscribe((todo) => {
      this.selectedTodo = todo;
    });
    this.completedTodos = this.todoService.completedTodos;
    this.unCompletedTodos = this.todoService.uncompletedTodos;
  }

  addTodo(form: NgForm) {
    if (form.valid) {
      this.todoService.addTodo({
        title: form.value.todoData.todoTitle,
        desc: 'Write description. It will save automatically',
        completed: false,
        creatDate: new Date(),
      });
      form.reset();
    }
  }

  addToCompleted(todo: Todo) {
    this.todoService.addToCompleted(todo);
  }
  addToUnCompleted(todo: Todo) {
    this.todoService.addToUncompleted(todo);
  }
}
