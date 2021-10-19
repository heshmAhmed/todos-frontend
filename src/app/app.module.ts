import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoService } from './service/todo.service';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoItemComponent } from './todos-list/todo-item/todo-item.component';
import { TodoDetailsComponent } from './todos-list/todo-details/todo-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LocalStorageService } from './service/local-storage.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    HeaderComponent,
    TodoItemComponent,
    TodoDetailsComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    TodoService,
    AuthService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
