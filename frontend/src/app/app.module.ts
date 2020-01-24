import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DateComponent} from './date/date.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskFormComponent} from './task-form/task-form.component';
import {ForumentryListComponent} from './forumentry-list/forumentry-list.component';
import {ForumentryFormComponent} from './forumentry-form/forumentry-form.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent, DialogOverviewExampleDialog} from './event-form/event-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {TagFormComponent} from './tag-form/tag-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonToggle,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule, MatButtonToggleModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule
} from '@angular/material';
import {FriendsFormComponent} from './friends-form/friends-form.component';
import {FriendsListComponent} from './friends-list/friends-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {HomepageComponent} from './homepage/homepage.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {EventSearchComponent} from './event-search/event-search.component';
import {JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CalenderComponent} from './calender/calender.component';
import {MediainputComponent} from './mediainput/mediainput.component';
import {FileUploadModule} from 'ng2-file-upload';
import {RegistrationComponent} from './registration/registration.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CheckInvitationComponent} from './check-invitation/check-invitation.component';
import { CheckTasksComponent } from './check-tasks/check-tasks.component';
import {ShareModule} from '@ngx-share/core';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
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
    RegistrationComponent,
    CheckInvitationComponent,
    CalenderComponent,
    MediainputComponent,
    DialogOverviewExampleDialog,
    CheckTasksComponent,
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    MatExpansionModule,
    MatListModule,
    FormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonToggleModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    FileUploadModule,
    MatSidenavModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
