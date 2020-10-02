import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { StoreModule } from '@ngrx/store';
import { ToDoReducer } from '@reducers/todo.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ToDoComponent],
  imports: [BrowserModule, FormsModule, StoreModule.forRoot({ todos: ToDoReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
