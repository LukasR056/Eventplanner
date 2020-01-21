import {Component, OnInit} from '@angular/core';
import {EventService} from './service/event.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  invitedEvents: any;
  username: any;
  userId: any;
  invitations = false;


  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.countInv();
  }

  countInv() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');
    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        this.invitedEvents = response.filter(event => event.invited.includes(Number(this.userId))).length;
        if (this.invitedEvents > 0) {
          this.invitations = true;
        }
        return this.invitedEvents;
      });

  }



}


