import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/todo.model';
import { AuthService } from './auth.service';
import { IAuthTodoService } from './iauth-todo.service';
import { ITodoService } from './itodo.service';

@Injectable()
export class TodoService implements ITodoService, IAuthTodoService {
  public completedTodos: Todo[] = [];
  public uncompletedTodos: Todo[] = [];
  public selectedTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private authService: AuthService, private http: HttpClient) {}

  addTodo(todo: Todo) {
    if (this.authService.userObservable.getValue()) {
      this.http
        .post<Todo>(environment.url + 'users/todos', todo)
        .subscribe((todo) => {
          this.uncompletedTodos.push(todo);
        });
    } else this.uncompletedTodos.push(todo);
  }

  updateTodo(todo: Todo): void {
    if (this.authService.userObservable.getValue())
      this.http.put(environment.url + 'users/todos', todo).subscribe();
  }

  deleteTodo(todo: Todo): void {
    if (todo.completed) {
      let index = this.completedTodos.indexOf(todo, 0);
      this.completedTodos.splice(index, 1);
    } else {
      let index = this.uncompletedTodos.indexOf(todo, 0);
      this.uncompletedTodos.splice(index, 1);
    }

    if (this.authService.userObservable.getValue())
      this.http.delete(environment.url + 'users/todos/' + todo.id).subscribe();
  }

  addToCompleted(todo: Todo): void {
    todo.completed = true;
    let index = this.uncompletedTodos.indexOf(todo, 0);
    this.uncompletedTodos.splice(index, 1);
    this.completedTodos.push(todo);
    this.updateTodo(todo);
  }

  addToUncompleted(todo: Todo): void {
    todo.completed = false;
    let index = this.completedTodos.indexOf(todo, 0);
    this.completedTodos.splice(index, 1);
    this.uncompletedTodos.push(todo);
    this.updateTodo(todo);
  }

  handleLogin(todos: Todo[]): void {
    this.handleLogout();
    todos.map((todo) => {
      if (todo.completed) this.completedTodos.push(todo);
      else this.uncompletedTodos.push(todo);
    });
  }

  handleLogout(): void {
    this.completedTodos.length = 0;
    this.uncompletedTodos.length = 0;
    this.selectedTodo.emit(null!);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url + 'users/todos');
  }
}
