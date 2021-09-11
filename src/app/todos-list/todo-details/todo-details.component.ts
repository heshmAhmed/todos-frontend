import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  @Input() todo?: Todo;
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
  
  delete(){
    this.todoService.delete(this.todo!);
  }

  updateTitle(event: any){
    this.todo!.title = (<HTMLInputElement>event.target).value;
    this.todoService.update(this.todo!);
  }

  updateDesc(event: any){
    this.todo!.desc = (<HTMLInputElement>event.target).value;
    this.todoService.update(this.todo!);
  }


}
