import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // check لو الإيميل موجود
    const exist = users.find((u: any) => u.email === user.email);

    if (exist) {
      return false; // already exists
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (found) {
      localStorage.setItem('user', JSON.stringify(found));
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }
}