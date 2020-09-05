import { Component, OnInit, OnDestroy } from '@angular/core';

import { TodosService } from 'src/app/shared/services/todos.service';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['select', 'title', 'is_completed', 'actions'];
  public todos: Todo[] = [];
  public selection = new SelectionModel<Todo>(true, []);

  constructor(
    private todosService: TodosService
  ) { }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.todos.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.todos.forEach(row => this.selection.select(row));
  }

  public checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.todos.indexOf(row) + 1}`;
  }

  public checkIfCompleted(todo: Todo): string {
    return todo.isCompleted ? 'done' : 'close';
  }

  public deleteTodo(todo: Todo): void {
    this.todosService.destroy(todo);
  }

  public deleteMultiple(): void {
    this.todosService.destroyMultiple(this.selection.selected);
  }

  public ngOnInit(): void {
    this.todosService.index();
    this.todosService.todos$.subscribe((todos: Todo[]) => this.todos = todos);
  }

  public ngOnDestroy(): void {
    this.todosService.clear();
  }

}
