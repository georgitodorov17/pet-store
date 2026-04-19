import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.isLoading = true;

    this.authService.register(email!, password!)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // redirect after success
      })
      .catch((err: Error) => {
        this.isLoading = false;
        this.errorMessage = this.getErrorMessage(err.message);
      });
  }

  private getErrorMessage(message: string): string {
    if (message.includes('email-already-in-use')) {
      return 'This email is already registered.';
    }
    if (message.includes('invalid-email')) {
      return 'Invalid email address.';
    }
    if (message.includes('weak-password')) {
      return 'Password must be at least 6 characters.';
    }
    return 'Something went wrong. Please try again.';
  }
}
