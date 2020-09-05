import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/services/todos.service';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-edit',
  templateUrl: './todos-edit.component.html',
  styleUrls: ['./todos-edit.component.scss']
})
export class TodosEditComponent implements OnInit, OnDestroy {

  public edit: FormGroup;
  public todo: Todo;
  private subscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private readonly route: ActivatedRoute
  ) { }

  public onSubmit() {
    if (this.edit.valid) {
      this.todosService.update(this.todo, this.edit.value);
    }
  }

  public ngOnInit(): void {
    this.subscribe = this.todosService.show(this.route.snapshot.params.todo)
      .subscribe((todo: Todo) => {
        this.todo = todo;

        ['title', 'description', 'isCompleted'].forEach((fieldName: string) => {
          this.edit.controls[fieldName].setValue(todo[fieldName]);
        });
      });

    this.edit = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      isCompleted: [false]
    });
  }

  public ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
