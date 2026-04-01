import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  remember = false;
  message = '';
  submitted = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.submitted = true;

    if (!this.email || !this.password) {
      this.message = 'Please fill all fields';
      return;
    }

    if (!this.email.includes('@')) {
      this.message = 'Invalid email';
      return;
    }

    const success = this.auth.login(this.email, this.password);

    if (success) {
      if (this.remember) {
        localStorage.setItem('remember', 'true');
      } else {
        localStorage.removeItem('remember');
      }
      this.router.navigate(['/cart']);
    } else {
      this.message = 'Email or password incorrect';
    }
  }
}