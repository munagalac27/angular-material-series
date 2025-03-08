import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';

interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  role?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isCollapsed = false;
  isHovered = false;
  userRole: string = 'guest';
  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService, private menuService: MenuService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.userRole = user ? user.role : 'guest';
      this.loadMenu();
    });
  }

  loadMenu() {
    this.menuService.getMenu().subscribe(data => {
      this.menuItems = data.filter(item => this.canAccess(item));
    });
  }

  canAccess(menuItem: MenuItem): boolean {
    return !menuItem.role || menuItem.role === this.userRole;
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }
}
