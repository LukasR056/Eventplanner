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
  invitationsNotEmpty = true;


  constructor(private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    //den eingeloggten User bekommen
    this.username = localStorage.getItem('username');
    this.userId = Number(localStorage.getItem('user_id'));
    // Alle Events laden und diese dann Filtern ob sich der User bei den Eingeladenen Personen dabei ist und zugelich auch nicht der Eventplanner vom Event ist
    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        this.events = response.filter(event => event.invited.includes(this.userId) && event.eventplanner != this.userId );

        //Falls er keine Einladungen hat, wird im frontend was anderes angezeigt. Deshalb hier ein Flag
        if (this.events.length === 0) {
          this.invitationsNotEmpty = false;
        }
      });

  }

  // Möchte der User beitereten so wird diese Funktion aufgerufen.
  //Dabei wird zuerst das Event geholt und anschließend der User von der invited Liste zu der participant hinzugefügt
  //Anschließend wird das Event noch upgedated und auf das Eventdetail weitergeleitet
  invite(id: any) {
    const updateEvent = this.events.find(event => event.id === id);
    // Bei !== kommt nicht der gewünschte Output raus bei !=, deshalb das folgende Kommentar
    // tslint:disable-next-line:triple-equals
    updateEvent.invited = updateEvent.invited.filter(user => user != this.userId);
    updateEvent.participants.push(Number(this.userId));
    console.log(updateEvent);
    this.eventService.updateEvent(updateEvent).subscribe(() => {
      this.router.navigate(['/event-detail/' + updateEvent.id]);
    });
  }

  // um mehr Informationen über das Event zu bekommen, weiterleitung
  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }

  //möchte der User nicht teilnehmen so wird er von der invited List entfernt und zusätzlich von der angezeigten Liste entfernt
  cancel(id: any) {
    const updateEvent = this.events.find(event => event.id === id);
    // Bei !== kommt nicht der gewünschte Output raus bei !=, deshalb das folgende Kommentar
    // tslint:disable-next-line:triple-equals
    updateEvent.invited = updateEvent.invited.filter(user => user != this.userId);
    this.eventService.updateEvent(updateEvent).subscribe(() => {
      const indexOfcanceledEvnet = this.events.indexOf(updateEvent);
      this.events.splice(indexOfcanceledEvnet, 1);
    });
  }
}
