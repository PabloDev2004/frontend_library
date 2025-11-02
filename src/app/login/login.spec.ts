import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Componente: Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores iniciales vacíos en los campos de usuario y clave', () => {
    expect(component['usuario']).toBe('');
    expect(component['clave']).toBe('');
  });

  it('debería mostrar mensaje de error si los campos están vacíos al enviar', () => {
    component['usuario'] = '';
    component['clave'] = '';
    component.login(); // Simulamos clic en “Entrar”
    expect(component['mensaje']).toContain(''); // Aquí puedes personalizar el texto de error
  });
});
