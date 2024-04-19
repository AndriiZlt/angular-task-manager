import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginNameService } from 'src/app/services/loginName.service';
import { Register } from 'src/app/models/register';
import { JwtAuth } from 'src/app/models/jwtAuth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  valid: boolean = false;
  inputType: string = 'password';
  isDisabled: boolean = true;

  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginNameService: LoginNameService,
    private authService: AuthService
  ) {
    localStorage.setItem('lastUrl', 'register');
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-z0-9]*$/),
          Validators.minLength(3),
        ],
      ],
      surname: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-z0-9]*$/),
          Validators.minLength(3),
        ],
      ],
      username: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-z0-9]*$/),
          Validators.minLength(5),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
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
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('Invalid input', this.registerForm.errors);
      return;
    }
    this.valid = true;
    console.log('Logging in... =>' + JSON.stringify(this.registerForm.value));

    let capitalized = // Making first letter uppercase
      this.registerForm.value.name.charAt(0).toUpperCase() +
      this.registerForm.value.name.slice(1);

    this.registerDto.Name = this.capitalize(this.registerForm.value.name);
    this.registerDto.Surname = this.capitalize(this.registerForm.value.surname);
    this.registerDto.Username = this.registerForm.value.username;
    this.registerDto.Email = this.registerForm.value.email;
    this.registerDto.Password = this.registerForm.value.password;

    this.register(this.registerDto);

    this.loginNameService.triggerEvent(capitalized);
    // this.login();
  }

  onFormChange(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  register(registerDto: Register) {
    try {
      this.authService.register(registerDto).subscribe((data) => {
        // console.log('Registration data:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('lastUrl', 'home/task-manager');
        this.router.navigate(['home/task-manager']);
      });
    } catch (error) {
      console.log('Error:', error.message);
    }
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

  toLoginPage(): void {
    this.router.navigate(['login']);
  }
}
