import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable()
export class localStorageService {
  LOCAL_STORAGE_KEY: string = 'userToken';

  public setUserToLocalStorage(user: User) {
    user.todos = [];
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)!);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
