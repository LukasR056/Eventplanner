import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  pictures: number;
  userFormGroup: any;
  friendOptions: any;
  userId: any;
  user: any;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user_id'));
    //this.pictures = this.userId.pictures;
    this.userService.retrieveUserOptions().subscribe((result) => {
      this.friendOptions = result;
    });

    this.userService.getUserById(this.userId)
      .subscribe((response: any) => {
        this.user = response;
        this.user.id = response.id;
        this.pictures = response.pictures;
        console.log('sag mir Id Bruda: ' + this.user.id);
        console.log('zeig schwanz Bruda: ' + this.pictures );
      });




  }




}
