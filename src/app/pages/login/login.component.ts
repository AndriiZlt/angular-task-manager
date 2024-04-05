import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';
import { JwtAuth } from 'src/app/models/jwtAuth';
import { AuthService } from 'src/app/services/auth.service';

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    localStorage.setItem('lastUrl', 'login');
  }

  ngOnInit(): void {
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
    console.log('SUCCESS =>' + JSON.stringify(this.loginForm.value));

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
    this.authService.login(loginDto).subscribe((jwtDto) => {
      console.log('Logged user from backend:', jwtDto);
      localStorage.setItem('token', jwtDto.token);
      localStorage.setItem('lastUrl', 'home/task-manager');
      this.router.navigate(['home/task-manager']);
      this.loginService.triggerEvent(jwtDto.name);
    });
  }

  passwordShowHide(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  toRegisterPage(): void {
    this.router.navigate(['/register']);
  }
}
