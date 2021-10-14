import { Todo } from './todo.model';
export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public _tokenExpDate: number,
    public _tokenIatDate: number,
    public token: string,
    public todos: Todo[]
  ) {}
}
