import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { AuthService } from './services/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  searchText = '';
  lastScroll = 0;
  activeDropdown = '';

  constructor(
    public cartService: CartService,
    private searchService: SearchService,
    public authService: AuthService
  ) {}

  @HostListener('window:scroll', [])
  onScroll() {
    const header = document.getElementById('mainHeader');
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    this.lastScroll = currentScroll;
  }

  toggleDropdown(name: string) {
    this.activeDropdown = this.activeDropdown === name ? '' : name;
  }

  closeDropdown() {
    this.activeDropdown = '';
  }

  onSearch() {
    this.searchService.changeSearch(this.searchText);
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
  }
}