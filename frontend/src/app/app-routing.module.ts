import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskFormComponent} from './task-form/task-form.component';
import {TagFormComponent} from './tag-form/tag-form.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {ForumentryListComponent} from './forumentry-list/forumentry-list.component';
import {ForumentryFormComponent} from './forumentry-form/forumentry-form.component';
import {EventFormComponent} from './event-form/event-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {FriendsListComponent} from './friends-list/friends-list.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {CalenderComponent} from './calender/calender.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {CheckInvitationComponent} from './check-invitation/check-invitation.component';
import {CheckTasksComponent} from './check-tasks/check-tasks.component';


const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'task-form', component: TaskFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'task-form/:id', component: TaskFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'tag-list', component: TagListComponent, canActivate: [AuthenticationGuard] },
  { path: 'tag-form', component: TagFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'forumentry-list', component: ForumentryListComponent, canActivate: [AuthenticationGuard] },
  { path: 'forumentry-form', component: ForumentryFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthenticationGuard] },
  { path: 'event-form', component: EventFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'event-form/:id', component: EventFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthenticationGuard] },
  { path: 'user-form', component: UserFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'event-detail/:id', component: EventDetailComponent, canActivate: [AuthenticationGuard] },
  { path: 'friends-list', component: FriendsListComponent, canActivate: [AuthenticationGuard] },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'tag-list', component: TagListComponent, canActivate: [AuthenticationGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'check-invitation', component: CheckInvitationComponent, canActivate: [AuthenticationGuard] },
  { path: 'check-tasks', component: CheckTasksComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
