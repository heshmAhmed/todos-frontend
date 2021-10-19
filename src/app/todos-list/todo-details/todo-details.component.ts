import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  @Input() todo?: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  delete() {
    this.todoService.deleteTodo(this.todo!);
  }

  updateTitle(event: any) {
    this.todo!.title = (<HTMLInputElement>event.target).value;
    this.todoService.updateTodo(this.todo!);
  }

  updateDesc(event: any) {
    this.todo!.desc = (<HTMLInputElement>event.target).value;
    this.todoService.updateTodo(this.todo!);
  }

  toggle(event: any) {
    if (event.target.checked) this.todoService.addToCompleted(this.todo!);
    else this.todoService.addToUncompleted(this.todo!);
  }
}
