import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ForumentryListComponent } from './forumentry-list/forumentry-list.component';
import { ForumentryFormComponent } from './forumentry-form/forumentry-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagFormComponent } from './tag-form/tag-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    ForumentryListComponent,
    ForumentryFormComponent,
    EventListComponent,
    EventFormComponent,
    UserListComponent,
    UserFormComponent,
    TagListComponent,
    TagFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
