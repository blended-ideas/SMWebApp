import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  faSpinner = faSpinner;
  isLoggingIn: boolean;

  loginError = {
    errorMessage: '',
    hasError: false
  };
  private returnUrl: string;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authenticationService.clearCredentials();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || null;
  }

  login() {
    this.isLoggingIn = true;
    this.loginError.hasError = false;

    const {username, password} = this.loginForm.value;
    this.authenticationService.login(username, password)
      .pipe(delay(1000))
      .subscribe(() => {
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.isLoggingIn = false;
      }, errorResponse => {
        this.isLoggingIn = false;
        this.loginError.hasError = true;
        this.loginError.errorMessage = errorResponse.error.detail;
      });
  }
}
