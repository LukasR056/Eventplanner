import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ForumentryService} from '../service/forumentry.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forEachComment} from 'tslint';
import {UserService} from '../service/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  events: any;
  event: any;
  forumentry: any;
  tasksOpen: Array<any>;
  tasksInProgress: Array<any>;
  tasksDone: Array<any>;
  userOptions;
  test: any;
  forumentries: any[];
  forumentryFormGroup;
  displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited' ];


  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private http: HttpClient, private eventService: EventService, private route: ActivatedRoute,
              private userService: UserService,  private router: Router,
              private forumentryService: ForumentryService) { }

  ngOnInit() { this.forumentryFormGroup = this.fb.group({
    'content': [null],
    'user': [null],
    'event': [null],
  });
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksOpen = [];
    this.tasksInProgress = [];
    this.tasksDone = [];


    //this.forumentryService.getForumentries()
      //.subscribe((response: any[]) => {
        //this.forumentries = response;
      //});

    this.loadForumEntries(id);

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;

        // this.test = this.event;
        //this.filterTasks();
      });

    this.eventService.getEvents()
      .subscribe((response: any) => {
        this.events = response;
      });

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;
    });
  }


  private loadForumEntries(id) {
    this.forumentryService.getForumentryWithEventId(id)
      .subscribe((response: any) => {
        this.forumentries = response;
      });
  }

  createForumentry() {
  const id = this.route.snapshot.paramMap.get('id');
  const forumentry = this.forumentryFormGroup.value;
  this.forumentryService.createForumentry(forumentry)
    .subscribe((response: any) => {
      this.loadForumEntries(id);
    });
}



filterTasks() {
   this.events.tasks.forEach(task => {
     switch (task.status) {
       case 'o':
         this.tasksOpen.push(task);
         break;
       case 'i':
         this.tasksInProgress.push(task);
         break;
       case 'd':
         this.tasksDone.push(task);
         break;
     }
     /*if (task.status === 'i') {
        this.test = 'KOMISCH';
        this.tasksInProgress.push(task);
      }*/
    });
    /*for (const task of this.event.tasks) {
      /*if (task.status === 'i') {
        this.test = 'KOMISCH';
      }
      switch (task.status) {
        case 'o':
          this.tasksOpen.push(task);
          break;
        case 'i':
          this.tasksInProgress.push(task);
          break;
        case 'd':
          this.tasksDone.push(task);
          break;
      }
    }*/
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }


}
