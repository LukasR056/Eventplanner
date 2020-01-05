import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskFormComponent} from './task-form/task-form.component';
import {TagFormComponent} from './tag-form/tag-form.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {ForumentryListComponent} from './forumentry-list/forumentry-list.component';
import {ForumentryFormComponent} from './forumentry-form/forumentry-form.component';
import {EventFormComponent} from './event-form/event-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';


const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-form', component: TaskFormComponent },
  { path: 'tag-list', component: TagListComponent },
  { path: 'tag-form', component: TagFormComponent },
  { path: 'forumentry-list', component: ForumentryListComponent },
  { path: 'forumentry-form', component: ForumentryFormComponent },
  { path: 'event-list', component: EventFormComponent },
  { path: 'event-form', component: EventFormComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
