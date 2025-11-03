import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // CORRECCIÓN: Inyección del Router
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router); // CORRECCIÓN: Se inyecta el Router
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      loginIdentifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Si el usuario ya está logueado, lo redirige al panel
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/panel']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/panel']); // Redirección al panel
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      },
    });
  }

  onGuestLogin(): void {
    this.loading = true;
    this.errorMessage = null;

    this.authService.guestLogin().subscribe({
      next: () => {
        this.router.navigate(['/panel']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      },
    });
  }
}