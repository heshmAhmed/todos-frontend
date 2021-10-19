import { EventEmitter } from '@angular/core';
import { Todo } from '../model/todo.model';

export interface ITodoService {
  completedTodos: Todo[];
  uncompletedTodos: Todo[];
  selectedTodo: EventEmitter<Todo>;
  addTodo(todo: Todo): void;
  deleteTodo(todo: Todo): void;
  updateTodo(todo: Todo): void;
  addToCompleted(todo: Todo): void;
  addToUncompleted(todo: Todo): void;
}
