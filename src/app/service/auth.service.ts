import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';
import jwt_decode from 'jwt-decode';
import { Jwt } from '../model/jwt.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { TodoService } from './todo.service';

@Injectable()
export class AuthService {
  userObservable = new Subject<User>();
  private tokenExpirationTimer?: any;

  constructor(
    private http: HttpClient,
    private lStorageService: LocalStorageService,
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
      decodedToken.exp * 1000,
      decodedToken.iat * 1000,
      encodedToken,
      body
    );
    this.userObservable.next(user);
    this.autoLogout(user._tokenExpDate - user._tokenIatDate);
    this.lStorageService.setUserToLocalStorage(user);
  }

  autoLogin() {
    let user = this.lStorageService.getCurrentUser();
    if (!user) return;
    if (this.checkExpDate(user._tokenExpDate)) {
      this.todoService.getTodos();
      this.userObservable.next(user);
      this.autoLogout(user._tokenExpDate - user._tokenIatDate);
    }
  }

  autoLogout(duration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    this.lStorageService.clearLocalStorage();
    this.userObservable.next(null!);
    clearTimeout(this.tokenExpirationTimer);
  }

  checkExpDate(date: number) {
    if (!date || new Date() > new Date(date)) return false;
    return true;
  }
}
