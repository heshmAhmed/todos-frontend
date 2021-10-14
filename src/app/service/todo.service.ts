import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/todo.model';
@Injectable()
export class TodoService {
  public completedTodos: Todo[] = [];
  public unCompletedTodos: Todo[] = [];
  public selectedTodoObs = new EventEmitter<Todo>();

  constructor(private http: HttpClient) {}

  setTodosLists(todos: Todo[]) {
    todos.map((todo) => {
      if (todo.completed) this.completedTodos.push(todo);
      else this.unCompletedTodos.push(todo);
    });
  }

  handleLogout() {
    this.completedTodos.length = 0;
    this.unCompletedTodos.length = 0;
  }

  addTodo(todo: Todo) {
    this.unCompletedTodos.push(todo);
  }

  delete(todo: Todo) {
    if (todo.completed) {
      let index = this.completedTodos.indexOf(todo, 0);
      this.completedTodos.splice(index, 1);
    } else {
      let index = this.unCompletedTodos.indexOf(todo, 0);
      this.unCompletedTodos.splice(index, 1);
    }
  }

  update(todo: Todo) {}

  addToCompleted(todo: Todo) {
    todo.completed = true;
    let index = this.unCompletedTodos.indexOf(todo, 0);
    this.unCompletedTodos.splice(index, 1);
    this.completedTodos.push(todo);
  }

  addToUnCompleted(todo: Todo) {
    todo.completed = false;
    let index = this.completedTodos.indexOf(todo, 0);
    this.completedTodos.splice(index, 1);
    this.unCompletedTodos.push(todo);
  }

  getTodos() {
    this.http
      .get<Todo[]>(environment.url + 'users/todos')
      .subscribe((response) => {
        this.setTodosLists(response);
      });
  }
}
