import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendshipRequestService {

  constructor(private http: HttpClient) { }

  getFriendshipRequests() {
    return this.http.get('/api/friendship-request/list');
  }

  createFriendshipRequest(friendRequest: any) {
    return this.http.post('/api/friendship-request/create', friendRequest);
  }

  updateFriendshipRequest(friendRequest: any) {
    return this.http.put('/api/friendship-request/' + friendRequest.id + '/update', friendRequest);
  }
}
