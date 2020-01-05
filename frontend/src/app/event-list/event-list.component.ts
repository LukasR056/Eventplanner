import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[];
  displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited' ]; //

  constructor(private http: HttpClient, private eventService: EventService) { }

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
}
