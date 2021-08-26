import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IUser } from '../../shared/interafaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  message = '';

  constructor(public authSvc: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Пожалуйта, введите данные';
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authSvc.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      },
    );
  }

  showError(inputName: string): boolean {
    const inputControl = this.form.get(inputName);
    return !!(inputControl?.touched && inputControl?.invalid);
  }
}
