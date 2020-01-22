import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';

Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<Observable<any>> {
  constructor(private eventService: EventService) {
  }

  resolve() {
    return this.eventService.retrieveEvents();
  }
}
