import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // ✅ corregido: debe ser styleUrls en plural
})
export class Login {

  usuario: string = '';
  clave: string = '';
  mensaje: string = '';
  cargando: boolean = false; // 🔄 Nuevo: indica si está procesando el login

  constructor(private authService: AuthService) {}

  login() {
    // Evitar login vacío
    if (!this.usuario.trim() || !this.clave.trim()) {
      this.mensaje = 'Por favor, completa ambos campos.';
      return;
    }

    this.cargando = true;
    this.mensaje = 'Iniciando sesión...';

    this.authService.login(this.usuario, this.clave).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.mensaje = `¡Bienvenido ${this.usuario}!`;
        console.log('Sesión iniciada:', respuesta);
        // 🔁 Aquí podrías redirigir al dashboard si lo deseas
      },
      error: (err) => {
        this.cargando = false;
        this.mensaje = err.error?.message || 'Credenciales incorrectas. Intenta nuevamente.';
      }
    });
  }
}
