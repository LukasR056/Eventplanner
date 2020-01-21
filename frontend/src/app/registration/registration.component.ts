import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationUserFormGroup;
  registrationProfileFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router,
              private jwtHelperService: JwtHelperService) { }

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
      this.http.post('/api/api-token-auth/', this.registrationUserFormGroup.value).subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        const decodedTokenUserId = this.jwtHelperService.decodeToken(res.token).user_id;
        localStorage.setItem('user_id', decodedTokenUserId);
        localStorage.setItem('username', this.registrationUserFormGroup.value.username);
        this.http.put('api/user/' + decodedTokenUserId + '/update', this.registrationProfileFormGroup.value).subscribe(() => {
          this.router.navigate(['homepage']);
        });
      });
    });
  }

}
