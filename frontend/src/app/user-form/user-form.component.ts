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
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  userFormGroup: any;
  friendOptions: any;
  userId: any;
  user: any;
  forumentryFormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user_id'));

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.friendOptions = result;
    });

    this.userFormGroup = this.fb.group({
      id: [null],
      user: [this.userId],
      first_name: [null],
      last_name: [null],
      birthday: [null],
      pictures: [[]],

    });

    this.userService.getUserById(this.userId)
      .subscribe((response: any) => {
        this.user = response;
        this.user.id = response.id;
        this.user.first_name = response.first_name;
        this.user.last_name = response.last_name;
       // console.log('sag mir Id Bruda: ' + this.user.id);
       // console.log('sag mir firstname Bruda: ' + this.user.first_name);
       // console.log('sag mir lastname Bruda: ' + this.user.last_name);
        this.userFormGroup.patchValue(response);

      });


  }

  updateProfile(userId: any) {
    this.router.navigate(['/user-form/' + userId]);
  }

  updateUser() {
    // this.userService.getUserById(this.userId)
    const user = this.userFormGroup.value;
    console.log(user);
    this.userService.updateUser(user)
        .subscribe(() => {
          this.userService.userGotUpdated.next(true);
          this.router.navigate(['/homepage']);
        });
    }

}
