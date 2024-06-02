import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginNameService } from '../services/loginName.service';
import { Login } from '../models/login.model';
import { JwtAuth } from '../models/jwtAuth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  valid: boolean = false;
  inputType: string = 'password';
  isDisabled: boolean = true;

  loginDto = new Login();
  jwtDto = new JwtAuth();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginNameService: LoginNameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-z0-9]*$/),
          Validators.minLength(5),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('Invalid input', this.loginForm.errors);
      return;
    }
    this.valid = true;
    console.log('Logging with' + JSON.stringify(this.loginForm.value));

    this.loginDto.username = this.loginForm.value.username;
    this.loginDto.password = this.loginForm.value.password;

    this.login(this.loginDto);
  }

  onFormChange(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  login(loginDto: Login) {
    let subscription = this.authService.login(loginDto).subscribe((jwtDto) => {
      console.log('Token:', jwtDto.token);
      localStorage.setItem('token', jwtDto.token);
      this.router.navigate(['task']);
      this.loginNameService.triggerEvent(loginDto.username);
      subscription.unsubscribe();
    });
  }

  passwordShowHide(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  toRegisterPage(): void {
    this.router.navigate(['/auth/register']);
  }
}
