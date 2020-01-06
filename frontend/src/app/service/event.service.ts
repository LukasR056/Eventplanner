import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }


  getEvents() {
    return this.http.get('/api/event/list');
  }

  createEvent(event: any) {
    return this.http.post('/api/event/create', event);
  }

  updateEvent(event: any) {
    return this.http.put('/api/event/' + event.id + '/update', event);
  }

  deleteEvent(event: any) {
    return this.http.delete('/api/event/' + event.id + '/delete');
  }

  getFirstRow() {
    return this.http.get('/api/event/list/firstrow');
  }
}

