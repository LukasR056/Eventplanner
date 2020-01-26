import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {EventService} from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = new BehaviorSubject(false);
  profilePicLoaded = new BehaviorSubject(false);
  userGotUpdated = new BehaviorSubject(false);
  username: any;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private router: Router,) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }) {
    this.http.post('/api/api-token-auth/', userData).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('username', userData.username);
      const decodedTokenUserId = this.jwtHelperService.decodeToken(res.token).user_id;
      localStorage.setItem('user_id', decodedTokenUserId);
      this.isLoggedIn.next(true);
      this.profilePicLoaded.next(true);
      this.router.navigate(['homepage']);
    }, () => {
      alert('wrong username or password');
      // HIER Z.B. TOAST EINFÜGEN
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    window.location.reload();
  }

  retrieveUserOptions() {
    return this.http.get <any[]>('/api/user/list/');
  }

  getUserEventTask(id: any) {
    return this.http.get('/api/user/' + id + '/gettaskevent');
  }

  getAbstractUserByUsername(username: string) {
    return this.http.get<any>('/api/abstract-user/' + username + '/get');
  }

  getUserById(id: any) {
    return this.http.get('/api/user/' + id + '/get');
  }

  getUsers() {
    return this.http.get('/api/user/list/');
  }

  getUsersName() {
    return this.http.get('/api/user/list/name');
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


