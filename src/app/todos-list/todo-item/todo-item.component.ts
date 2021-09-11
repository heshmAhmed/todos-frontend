import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSelect(){
    this.todoService.selectedTodoObs.emit(this.todo);
  }

}
