import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumentryService {

  constructor(private http: HttpClient) { }


  getForumentries() {
    return this.http.get('/api/forumentry/list');
  }

  createForumentry(forumentry: any) {
    return this.http.post('/api/forumentry/create', forumentry);
  }

  getForumentryWithEventId(id: any) {
    return this.http.get('/api/forumentry/list/event/' + id + '/get', id);
  }

  updateForumentry(forumentry: any) {
    return this.http.put('/api/forumentry/' + forumentry.id + '/update', forumentry);
  }

  deleteForumentry(forumentry: any) {
    return this.http.delete('/api/forumentry/' + forumentry.id + '/delete');
  }
}
