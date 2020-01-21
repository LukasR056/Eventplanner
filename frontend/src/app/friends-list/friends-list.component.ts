import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  friends: any[];
  friendRequests: any[];
  idFriendRequested: any;
  userId: any;
  input = new FormControl();
  userList: any[];
  filteredUserList: Observable<any[]>;
  private userFriendFormGroup;
  private userFriendRequestedFormGroup;
  private userFormGroup;


  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.userFriendFormGroup = this.fb.group({
      'id': [null],
      'friends': [[]],
    });

    this.userFriendRequestedFormGroup = this.fb.group({
      'id': [null],
      'friend_requests': [[]],
    });

    this.userFormGroup = this.fb.group({
      'id': [null],
      'user': [null],
      'first_name': [''],
      'last_name': [''],
      'birthday': [null],
      'friends': [[]],
      'friend_requests': [[]],
    });

    this.userId = localStorage.getItem('user_id');
    this.userService.getUserById(this.userId).subscribe(response => {
      this.userFormGroup.patchValue(response);
      console.log(this.userFormGroup);
    });

    this.userService.getUsers().subscribe((response: any[]) => {
      this.userList = response.filter(user => !user.friends.includes(Number(this.userId))
        && !user.friend_requests.includes(Number(this.userId))
        && user.id !== Number(this.userId));
      this.friends = response.filter(user => user.friends.includes(Number(this.userId)));
      this.friendRequests = response.filter(user => user.friends.includes(Number(this.userId)))
        .filter(user => user.id !== this.userId);
    });

    this.filteredUserList = this.input.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.first_name),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  displayFn(user?: any): string | undefined {
    return user ? (user.first_name + ' ' + user.last_name) : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.userList.filter(option => option.first_name.toLowerCase().indexOf(filterValue) === 0);
  }

  removeFriend(id: any) {
    this.userFormGroup.value.friends = this.userFormGroup.value.friends.filter(friend => friend !== id);
    this.userService.updateUser(this.userFormGroup.value).subscribe(() => {
      this.ngOnInit();
      // TODO: MIT TOAST ERSETZEN
      alert('Friend removed');
    });
  }

  getFriendForRequest(data) {
    this.idFriendRequested = data.id;
  }

  addFriend() {
    this.userFormGroup.value.friend_requests.push(this.idFriendRequested);
    console.log(this.userFormGroup.value.friend_requests);
    this.userService.updateUser(this.userFormGroup.value).subscribe(() => {
      this.ngOnInit();
      // TODO: MIT TOAST ERSETZEN
      alert('Friend request sent');
    });
  }
}

