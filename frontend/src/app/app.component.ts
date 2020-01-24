import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn = false;
  pictures: number;
  friendOptions: any;
  userId: any;
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(response => {
      this.isLoggedIn = response;
    });
    this.userId = Number(localStorage.getItem('user_id'));
    // this.pictures = this.userId.pictures;
    this.userService.retrieveUserOptions().subscribe((result) => {
      this.friendOptions = result;
    });

    this.userService.getUserById(this.userId)
      .subscribe((response: any) => {
        this.user = response;
        this.user.id = response.id;
        this.pictures = response.pictures;
        // console.log('sag mir Id Bruda: ' + this.user.id);
        console.log('picture ID: ' + this.pictures);
        if (this.pictures >= 0) {
          console.log('works');
        }
      });
  }

}
