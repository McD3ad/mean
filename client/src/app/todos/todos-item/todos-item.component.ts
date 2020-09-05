import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from 'src/app/shared/services/todos.service';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.scss'],
})
export class TodosItemComponent implements OnInit, OnDestroy {

  public todo: Todo;

  private subscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) { }

  public ngOnInit(): void {
    this.subscribe = this.todosService.show(this.route.snapshot.params.todo)
      .subscribe((todo: Todo) => this.todo = todo);
  }

  public ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
