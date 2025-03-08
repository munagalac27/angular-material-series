import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  role?: string; // Role-based access control
  children?: MenuItem[]; // Nested menu items
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Simulated user role (Can be fetched from an API)
  userRole = 'admin'; // Change to 'user' to test role-based access

  // Dynamic menu structure
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    {
      label: 'Settings', icon: 'settings', role: 'admin',
      children: [
        {
          label: 'Profile', link: '/profile',
          icon: ''
        },
        {
          label: 'Account', link: '/account',
          icon: ''
        }
      ]
    },
    {
      label: 'Projects', icon: 'folder',
      children: [
        {
          label: 'Project 1', link: '/project1',
          icon: ''
        },
        {
          label: 'Project 2', link: '/project2',
          icon: ''
        }
      ]
    },
    { label: 'Help', icon: 'help', link: '/help' }
  ];

  // Function to check user role for access
  canAccess(menuItem: MenuItem): boolean {
    return !menuItem.role || menuItem.role === this.userRole;
  }
}
