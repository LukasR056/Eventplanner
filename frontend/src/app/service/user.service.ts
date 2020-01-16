import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


retrieveUserOptions() {
  return this.http.get <any[]>('/api/user/list/');
}

getAbstractUserByUsername(username: string) {
    return this.http.get<any>('/api/abstract-user/' + username + '/get');
}

getUsers() {
  return this.http.get('/api/user/list/');
}

createUser(user: any) {
  return this.http.post('/api/user/create', user);
}

updateUser(user: any) {
  return this.http.put('/api/user/' + user.id + '/update', user);
}

deleteUser(user: any) {
  return this.http.delete('/api/user/' + user.id + '/delete');
}

}

