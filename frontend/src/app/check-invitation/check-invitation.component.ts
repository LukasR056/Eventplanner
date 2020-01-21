import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-check-invitation',
  templateUrl: './check-invitation.component.html',
  styleUrls: ['./check-invitation.component.scss']
})
export class CheckInvitationComponent implements OnInit {
  events: any;
  private userId: any;
  private username: any;


  constructor(private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');
    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        this.events = response.filter(event => event.invited.includes(Number(this.userId)));
      });
  }

  invite(id: any) {
    const updateEvent = this.events.filter(event => event.id === id);
    // Bei !== kommt nicht der gewünschte Output raus bei !=, deshalb das folgende Kommentar
    // tslint:disable-next-line:triple-equals
    updateEvent[0].invited = updateEvent[0].invited.filter(user => user != this.userId);
    updateEvent[0].participants.push(Number(this.userId));
    this.eventService.updateEvent(updateEvent[0]).subscribe(() => {
      this.router.navigate(['/event-detail/' + updateEvent.id]);
      
    });
  }

  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }
}
