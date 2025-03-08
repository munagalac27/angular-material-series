import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  role?: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItem[]> {
    // Simulating an API request
    return this.http.get<MenuItem[]>('assets/menu.json'); // Load from a JSON file
  }
}
