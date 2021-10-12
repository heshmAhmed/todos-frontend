import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.authService.userObservable.subscribe((user) => {
      if (user) this.todoService.setTodosLists(user.todos);
      else this.todoService.handleLogout();
    });

    this.authService.autoLogin();
  }
  title = 'todos';
}
