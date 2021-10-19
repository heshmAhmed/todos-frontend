import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

export interface IAuthTodoService {
  handleLogin(todos: Todo[]): void;
  handleLogout(): void;
  getTodos(): Observable<Todo[]>;
}
