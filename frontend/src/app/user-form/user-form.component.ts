import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userFormGroup: any;
  friendOptions: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.retrieveUserOptions().subscribe((result) => {
      this.friendOptions = result;
    });

    this.userFormGroup = this.fb.group({
      id: [],
      first_name: [],
      last_name: [],
      username: [],
      birthday: [],
      email: [],
      active: [],
      friends: [[]],

    });

  }

}
