import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FriendshipRequestService} from '../service/friendship-request.service';
import { EventService } from '../service/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
// tslint:disable:triple-equals
export class FriendsListComponent implements OnInit {
  friends: any[];
  idFriendRequested: any;
  allFriendRequests: any[];
  friendRequestOfCounterpart: any;
  receivedFriendRequests: any[];
  receivedFriendRequestsRawId: any;
  receivedFriendRequestsCount: number;

  userId: any;
  input = new FormControl();
  userList: any[];
  pictures: any[];
  filteredUserList: Observable<any[]>;
  private friendRequestsFormGroup;
  private userFormGroup;
  events;


  constructor(private userService: UserService, private friendshipRequestService: FriendshipRequestService,
              private fb: FormBuilder, private eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.friendRequestsFormGroup = this.fb.group({
      id: [null],
      request_sent: [null, Validators.required],
      user: [null],
      potential_friends: [[]],
    });

    this.userFormGroup = this.fb.group({
      id: [null],
      user: [null],
      friend_requests: [[null]],
      first_name: [''],
      last_name: [''],
      birthday: [null],
      friends: [[]],
    });

    this.userId = Number(localStorage.getItem('user_id'));

    this.userService.getUsers().subscribe((response: any[]) => {
      this.userService.getUserById(this.userId).subscribe(currentUser => {
        this.userFormGroup.patchValue(currentUser);
        this.userList = response.filter(user => !user.friends.includes(this.userId)
          // some um zu überprüfen ob der Wert wenigstens 1x vorhanden ist wenn ja sollte er nicht vorkommen daher ! am Anfang
          && !this.userFormGroup.value.friend_requests.some(request => request.potential_friends.includes(user.id))
          && user.id !== this.userId);
      });

      this.friends = response.filter(user => user.friends.includes(this.userId));



      this.friendshipRequestService.getFriendshipRequests().subscribe((friendRequests: any[]) => {


        this.receivedFriendRequestsRawId = friendRequests.filter(request => request.user == this.userId
          && request.request_sent == false).map(request => request.potential_friends)[0];

        this.receivedFriendRequests = response.filter(user => this.receivedFriendRequestsRawId.includes(user.id));
        this.receivedFriendRequestsCount = this.receivedFriendRequests.length;

      });

    });

    this.friendshipRequestService.getFriendshipRequests().subscribe((response: any[]) => {
      this.allFriendRequests = response;
    });

    this.filteredUserList = this.input.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.first_name),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );

    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
       this.events = response;
      });

  }

  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }

  displayFn(user?: any): string | undefined {
    return user ? (user.first_name || user.last_name ? (user.first_name + ' ' + user.last_name) : ('@' + user.user.username)) : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.userList.filter(option => option.first_name.toLowerCase().indexOf(filterValue) === 0
      || option.last_name.toLowerCase().indexOf(filterValue) === 0
      || option.user.username.toLowerCase().indexOf(filterValue) === 0);
  }

  removeFriend(id: any) {
    this.userFormGroup.value.friends = this.userFormGroup.value.friends.filter(friend => friend !== id);
    this.userService.updateUser(this.userFormGroup.value).subscribe(() => {
      this.ngOnInit();
      alert('Friend removed');
    });
  }

  getFriendForRequest(data) {
    this.idFriendRequested = data.id;
  }

  addFriend(id: any, sent: boolean) {
    if (this.idFriendRequested == undefined && sent == true) {
      return;
    }
    alert('You successfully sent a friend request. They need to confirm it.');
    this.userFormGroup.value.friend_requests.forEach(request => {
      // RECEIVED --> (request_sent == false)
      if (request.request_sent == false && sent == false) {
        this.userFormGroup.value.friends.push(id);
        this.friendRequestsFormGroup.value.id = request.id;
        this.friendRequestsFormGroup.value.request_sent = false;
        this.friendRequestsFormGroup.value.user = this.userId;
        this.friendRequestsFormGroup.value.potential_friends = request.potential_friends.filter(obj => obj != id);

        this.friendRequestOfCounterpart = this.allFriendRequests.filter(singleRequest => singleRequest.user == id
          && singleRequest.request_sent == true)[0];
        this.friendRequestOfCounterpart.potential_friends = this.friendRequestOfCounterpart.potential_friends
          .filter(potentialFriend => potentialFriend != this.userId);
      }
      // REQUESTED --> (request_sent == true)
      if (request.request_sent == true && sent == true) {
        id = this.idFriendRequested;
        this.friendRequestsFormGroup.value.id = request.id;
        this.friendRequestsFormGroup.value.request_sent = true;
        this.friendRequestsFormGroup.value.user = this.userId;
        request.potential_friends.push(id);
        this.friendRequestsFormGroup.value.potential_friends = request.potential_friends;

        this.friendRequestOfCounterpart = this.allFriendRequests.filter(singleRequest => singleRequest.user == id
          && singleRequest.request_sent == false)[0];
        this.friendRequestOfCounterpart.potential_friends.push(this.userId);

        // um Searchfeld zu leeren
        this.input.setValue('');
      }
    });
    this.friendshipRequestService.updateFriendshipRequest(this.friendRequestsFormGroup.value).subscribe(() => {
      this.friendshipRequestService.updateFriendshipRequest(this.friendRequestOfCounterpart).subscribe(() => {
        this.userService.updateUser(this.userFormGroup.value).subscribe(() => {
          this.ngOnInit();
        });
      });
    });
  }

  declineFriendRequest(id: any) {
    this.userFormGroup.value.friend_requests.forEach(request => {
      // RECEIVED --> (request_sent == false)
      if (request.request_sent == false) {
        this.friendRequestsFormGroup.value.id = request.id;
        this.friendRequestsFormGroup.value.request_sent = false;
        this.friendRequestsFormGroup.value.user = this.userId;
        this.friendRequestsFormGroup.value.potential_friends = request.potential_friends.filter(obj => obj != id);

        this.friendRequestOfCounterpart = this.allFriendRequests.filter(singleRequest => singleRequest.user == id
          && singleRequest.request_sent == true)[0];
        this.friendRequestOfCounterpart.potential_friends = this.friendRequestOfCounterpart.potential_friends
          .filter(potentialFriend => potentialFriend != this.userId);
      }
    });
    this.friendshipRequestService.updateFriendshipRequest(this.friendRequestsFormGroup.value).subscribe(() => {
      this.friendshipRequestService.updateFriendshipRequest(this.friendRequestOfCounterpart).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

}
