import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoService } from './service/todo.service';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoItemComponent } from './todos-list/todo-item/todo-item.component';
import { TodoDetailsComponent } from './todos-list/todo-details/todo-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { localStorageService } from './service/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    HeaderComponent,
    TodoItemComponent,
    TodoDetailsComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [TodoService, AuthService, localStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
