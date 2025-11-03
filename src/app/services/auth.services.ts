import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Interfaces para tipado fuerte
interface AuthResponse {
  token: string;
  user: {
    id: string;
    nombre: string;
    correo: string;
    rol: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // --- CORRECCIÓN: URL de la API apuntando al backend ---
  private apiUrl = 'http://localhost:3000/api/auth'; 
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<AuthResponse['user'] | null>(null);

  isLoggedIn$ = this.tokenSubject.asObservable().pipe(map(token => !!token));
  currentUser$ = this.userSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    // Cargar sesión desde localStorage al iniciar el servicio
    this.loadSession();
  }

  // --- LÓGICA DE SESIÓN MEJORADA ---

  private saveSession(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.tokenSubject.next(response.token);
    this.userSubject.next(response.user);
  }

  private loadSession() {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.tokenSubject.next(token);
        this.userSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // --- MÉTODOS DE API ---

  login(credentials: { loginIdentifier: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        this.saveSession(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  guestLogin(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/guest`, {}).pipe(
      map(response => {
        this.saveSession(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'Ocurrió un error inesperado. Inténtelo de nuevo.';
    return throwError(() => new Error(errorMessage));
  }
  
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}