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
    this.todoService.selectedTodo.emit(null!);
  }

  updateTitle(input: any) {
    if (input.value.length >= 2) {
      this.todo!.title = input.value;
      this.todoService.updateTodo(this.todo!);
    } else input.value = this.todo?.title;
  }

  updateDesc(input: any) {
    this.todo!.desc = input.value;
    this.todoService.updateTodo(this.todo!);
  }

  toggle(event: any) {
    if (event.target.checked) this.todoService.addToCompleted(this.todo!);
    else this.todoService.addToUncompleted(this.todo!);
  }
}
