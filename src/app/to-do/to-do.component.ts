import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '@actions/todo.action';
import ToDo from '@models/todo.model';
import ToDoState from '@states/todo.state';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit, OnDestroy {
  public todo$: Observable<ToDoState>;
  public ToDoSubscription: Subscription;
  public ToDoList: ToDo[] = [];

  public Title = '';
  public IsCompleted = false;

  public todoError: Error = null;

  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.ToDoSubscription = this.todo$
      .pipe(
        map((x) => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  createToDo(): void {
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy(): void {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
