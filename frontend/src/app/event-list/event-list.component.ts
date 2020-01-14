import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[];

  constructor( private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((response: any[]) => {
        this.events = response;
      });
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  createNewEvent() {
    this.router.navigate(['/event-form']);
  }

  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }
  cancelEvent() {
    this.router.navigate(['/user-list']);
  }
}


