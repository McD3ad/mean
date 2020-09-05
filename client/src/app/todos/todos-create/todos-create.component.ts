import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/services/todos.service';

@Component({
  selector: 'app-todos-create',
  templateUrl: './todos-create.component.html',
  styleUrls: ['./todos-create.component.scss']
})
export class TodosCreateComponent implements OnInit {

  public create: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService
  ) { }

  public onSubmit() {
    if (this.create.valid) {
      this.todosService.store(this.create.value);
    }
  }

  public ngOnInit(): void {
    this.create = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      isCompleted: [false]
    });
  }

}
