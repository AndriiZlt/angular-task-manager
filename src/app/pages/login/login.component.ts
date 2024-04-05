import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';
import { Register } from 'src/app/models/register';
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
  registerDto = new Register();
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

    let capitalized = // Making first letter uppercase
      this.loginForm.value.name.charAt(0).toUpperCase() +
      this.loginForm.value.name.slice(1);

    this.registerDto.Name = this.capitalize(this.loginForm.value.name);
    this.registerDto.Surname = this.capitalize(this.loginForm.value.surname);
    this.registerDto.Username = this.loginForm.value.username;
    this.registerDto.Email = this.loginForm.value.email;
    this.registerDto.Password = this.loginForm.value.password;

    this.register(this.registerDto);

    this.loginService.triggerEvent(capitalized);
  }

  onFormChange(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  async register(registerDto: Register) {
    try {
      this.authService.register(registerDto).subscribe((data) => {
        console.log('Registration data:', data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      });
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('token', jwtDto.token);
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
