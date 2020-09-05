import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosItemComponent } from './todos-item/todos-item.component';
import { TodosCreateComponent } from './todos-create/todos-create.component';
import { TodosEditComponent } from './todos-edit/todos-edit.component';

const routes: Routes = [
  { path: '', component: TodosListComponent, data: { title: "Todos list", animation: 'TodosListPage' } },
  { path: 'add', component: TodosCreateComponent },
  { path: ':todo', component: TodosItemComponent, data: { animation: 'TodosItemPage' } },
  { path: ':todo/edit', component: TodosEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
