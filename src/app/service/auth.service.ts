import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';
import jwt_decode from 'jwt-decode';
import { Jwt } from '../model/jwt.model';
import { environment } from 'src/environments/environment';
import { localStorageService } from './local-storage.service';
import { TodoService } from './todo.service';

@Injectable()
export class AuthService {
  userObservable = new Subject<User>();

  constructor(
    private http: HttpClient,
    private lStorageService: localStorageService,
    private todoService: TodoService
  ) {}

  logIn(email: string, password: string) {
    return this.http
      .post<Todo[]>(
        environment.url + 'person/login',
        {
          email,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          let token = response.headers.get('Authorization')!;
          this.handleAuthentication(response.body!, token, email);
        })
      );
  }

  handleAuthentication(body: Todo[], encodedToken: string, userEmail: string) {
    let decodedToken: Jwt = jwt_decode(encodedToken);
    let user = new User(
      decodedToken.sub,
      decodedToken.username,
      userEmail,
      new Date(decodedToken.exp * 1000),
      new Date(decodedToken.iat * 1000),
      encodedToken,
      body
    );
    this.userObservable.next(user);
    this.lStorageService.setUserToLocalStorage(user);
  }

  autoLogin() {
    let user = this.lStorageService.getCurrentUser();
    if (!user) return;
    if (this.checkExpDate(user._tokenExpDate)) {
      this.todoService.getTodos();
      this.userObservable.next(user);
    }
  }

  logout() {
    this.lStorageService.clearLocalStorage();
    this.userObservable.next(null!);
  }

  checkExpDate(date: Date) {
    if (!date || new Date() > date) return false;
    return true;
  }
}
