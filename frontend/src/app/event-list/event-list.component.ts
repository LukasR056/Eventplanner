import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  providers: [DatePipe]
})
// tslint:disable:triple-equals
export class EventListComponent implements OnInit {

  username;
  userId;
  events;


  constructor(private eventService: EventService, private router: Router, private datepipe: DatePipe) {
  }

  ngOnInit() {

    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');

    this.events = [];

    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        for (const event of response) {
          if (event.eventplanner == this.userId || event.participants.some(x => x == this.userId)) {
            this.events.push(event);
          }
        }
        this.events.sort((a, b) => (a.date > b.date) ? 1 : -1);
      });


  }

  createNewEvent() {
    this.router.navigate(['/event-form']);
  }

  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }

  cancelEvent(id: any) {
    if (confirm('Are you sure you want to cancel?')) {
      const updateEvent = this.events.find(event => event.id === id);

      // tslint:disable-next-line:triple-equals
      updateEvent.participants = updateEvent.participants.filter(user => user != this.userId);
      this.eventService.updateEvent(updateEvent).subscribe( () =>{
      const indexOfcanceledEvnet = this.events.indexOf(updateEvent);
      this.events.splice(indexOfcanceledEvnet, 1);}
      );
    }
  }

}
