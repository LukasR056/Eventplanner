import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup;
  userId: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login() {
    this.http.post('/api/api-token-auth/', this.loginFormGroup.value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('username', this.loginFormGroup.value.username);
        this.userService.getAbstractUserByUsername(this.loginFormGroup.value.username).subscribe(result => {
          localStorage.setItem('user_id', result.id);
          this.router.navigate(['homepage']);
        });
      }, () => {
        alert('wrong username or password');
        // HIER Z.B. TOAST EINFÜGEN
      });
  }

}
