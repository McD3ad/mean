import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../interfaces/todo.interface';
import { Response } from '../interfaces/response.interface';
import { Pagination } from '../interfaces/pagination.interface';
import { environment } from 'src/environments/environment';

import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  public todos$: BehaviorSubject<Todo[]>;
  public pagination$: BehaviorSubject<Pagination>;

  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.todos$ = new BehaviorSubject([]);
    this.pagination$ = new BehaviorSubject(null);
  }

  public index(): void {
    this.subscription = this.http.get<Response<Todo[]>>(environment.apiUrl + 'todos')
      .subscribe((response: Response<Todo[]>) => {
        this.todos$.next(response.data);
        this.pagination$.next(response.meta);
      });
  }

  public show(todo): Observable<Todo> {
    return this.http.get<Response<Todo>>(environment.apiUrl + 'todos/' + todo)
      .pipe(
        map((response: Response<Todo>) => response.data)
      );
  }

  public store(formData): void {
    this.http.post<Response<Todo>>(environment.apiUrl + 'todos', formData)
      .subscribe((response: Response<Todo>) => {
        const currentTodos = this.todos$.getValue();

        this.todos$.next(
          [response.data, ...(currentTodos.length ? currentTodos.splice(currentTodos.length - 1, 1) : [])]
        );

        this.openSnackBar(response.meta.message);

        this.router.navigate(['/todos']);
      });
  }

  public update(todo: Todo, formData): void {
    this.http.patch<Response<any>>(environment.apiUrl + 'todos/' + todo._id, formData)
      .subscribe((response: Response<any>) => {
        this.openSnackBar(response.meta.message);
      });
  }

  public destroy(todo: Todo): void {
    this.http.delete(environment.apiUrl + 'todos/' + todo._id)
      .subscribe((response: Response<Todo[]>) => {
        this.todos$.next(response.data);
      });
  }

  public destroyMultiple(todos: Todo[]) {
    const candidates: string[] = todos.map(t => t._id);

    this.http.post<Response<any>>(environment.apiUrl + 'todos/multiple', { todos: candidates })
      .subscribe((response: Response<any>) => {
        const currentTodos = this.todos$.getValue();

        this.todos$.next([...currentTodos.filter(t => !candidates.includes(t._id))]);
        this.openSnackBar(response.meta.message);
      });
  }

  public clear() {
    this.subscription.unsubscribe();
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 6000,
    });
  }

}
