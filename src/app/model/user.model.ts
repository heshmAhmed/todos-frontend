import { Todo } from './todo.model';

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public _tokenExpDate: Date,
    public _tokenIatDate: Date,
    public token: string,
    public todos: Todo[]
  ) {}
}
