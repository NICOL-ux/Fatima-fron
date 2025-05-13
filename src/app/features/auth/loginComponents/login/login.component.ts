import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'admin@example.com';  
  password: string = '123456';        

  constructor(private router: Router) {} 

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Aquí podrías validar el usuario si quieres
    if (this.email === 'admin@example.com' && this.password === '123456') {
      this.router.navigate(['index']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
