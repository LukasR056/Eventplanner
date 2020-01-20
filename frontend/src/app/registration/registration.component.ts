import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationUserFormGroup;
  registrationProfileFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registrationUserFormGroup = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.registrationProfileFormGroup = this.fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required] // ,
      // 'birthday': ['', Validators.required]
    });

  }

  register() {
    this.http.post('api/user/create', this.registrationUserFormGroup.value).subscribe(() => {
      this.userService.getAbstractUserByUsername(this.registrationUserFormGroup.controls.username.value).subscribe(result => {
        this.http.post('/api/api-token-auth/', this.registrationUserFormGroup.value).subscribe((res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('username', this.registrationUserFormGroup.value.username);
          localStorage.setItem('user_id', result.id);
          this.http.put('api/user/' + result.id + '/update', this.registrationProfileFormGroup.value).subscribe(() => {
            this.router.navigate(['homepage']);
          });
        });
      });
    });
  }

}
