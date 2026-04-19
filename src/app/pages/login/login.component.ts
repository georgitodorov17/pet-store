import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.isLoading = true;

    this.authService.login(email!, password!)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // redirect after login
      })
      .catch((err: Error) => {
        this.isLoading = false;
        this.errorMessage = this.getErrorMessage(err.message);
      });
  }

  private getErrorMessage(message: string): string {
    if (message.includes('invalid-credential')) {
      return 'Invalid email or password.';
    }
    if (message.includes('invalid-email')) {
      return 'Invalid email format.';
    }
    return 'Login failed. Please try again.';
  }
}