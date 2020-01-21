import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DateComponent} from './date/date.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatButtonToggle, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule,
  MatTableModule, MatButtonToggleModule,
  MatToolbarModule,
} from '@angular/material';
import { FriendsFormComponent } from './friends-form/friends-form.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { HomepageComponent } from './homepage/homepage.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { EventSearchComponent } from './event-search/event-search.component';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalenderComponent } from './calender/calender.component';
import { MediainputComponent } from './mediainput/mediainput.component';
import {FileUploadModule} from 'ng2-file-upload';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    TagFormComponent,
    DateComponent,
    FriendsFormComponent,
    FriendsListComponent,
    EventDetailComponent,
    HomepageComponent,
    EventSearchComponent,
    LoginComponent,
    LogoutComponent,
    CalenderComponent,
    MediainputComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    NgbModalModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatListModule,
    FormsModule,
    DragDropModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
