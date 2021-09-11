import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoService } from './service/todo.service';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoItemComponent } from './todos-list/todo-item/todo-item.component';
import { TodoDetailsComponent } from './todos-list/todo-details/todo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    HeaderComponent,
    TodoItemComponent,
    TodoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
