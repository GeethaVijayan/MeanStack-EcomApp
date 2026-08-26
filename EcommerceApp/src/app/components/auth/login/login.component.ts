declare var google:any;
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  loginForm!: FormGroup;
  loading = false;
  returnUrl = '/';

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    google.accounts.id.initialize({
      client_id: '793391797247-mfi0f97mlt23l2k1da5t42t2dbde3noi.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response)
        });

    google.accounts.id.renderButton(
    document.getElementById('google-signin-button'),{
      theme: 'filled_blue',
      size: 'large',
      shape:'rectangle',
      width:300
    }

  );
   
  }

   
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  public decodeToken(token:any){
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(res:any){
     if(res){
      //decode  the token and get the user info\
      //store the token in local storage and navigate to the home page
      const payLoad = this.decodeToken(res.credential);
      sessionStorage.setItem('loggedInuser;',JSON.stringify(payLoad));
      this.router.navigateByUrl('/shop')
     }
   }
}
