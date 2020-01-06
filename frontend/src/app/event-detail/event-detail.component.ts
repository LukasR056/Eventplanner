import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ActivatedRoute} from '@angular/router';
import {forEachComment} from 'tslint';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: any;
  tasksOpen: Array<any>;
  tasksInProgress: Array<any>;
  tasksDone: Array<any>;
  test: any;
  displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited' ];


  constructor(private http: HttpClient, private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksOpen = [];
    this.tasksInProgress = [];
    this.tasksDone = [];

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;

        // this.test = this.event;

        this.filterTasks();
      });
  }

  filterTasks() {
   this.event.tasks.forEach(task => {
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
