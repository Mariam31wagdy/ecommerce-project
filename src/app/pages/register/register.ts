import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  name = '';
  email = '';
  password = '';
  message = '';
  submitted = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.submitted = true;

    if (!this.name || !this.email || !this.password) {
      this.message = 'All fields required';
      return;
    }

    if (!this.email.includes('@')) {
      this.message = 'Invalid email';
      return;
    }

    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters';
      return;
    }

    const success = this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (!success) {
      this.message = 'Email already exists';
    } else {
      this.message = 'Registered successfully';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }
  }
}