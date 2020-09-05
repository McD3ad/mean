import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosItemComponent } from './todos-item/todos-item.component';
import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { TodosCreateComponent } from './todos-create/todos-create.component';
import { TodosEditComponent } from './todos-edit/todos-edit.component';


@NgModule({
  declarations: [TodosListComponent, TodosItemComponent, TodosCreateComponent, TodosEditComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TodosModule { }
