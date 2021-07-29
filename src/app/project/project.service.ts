import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, public router: Router, private auth: AuthService) { }
  create(data) {
    return this.http.post(`${environment.apiUrl}/projects`, data, { responseType: 'text' });
  }
  getMyProjects() {
    return this.http.get(`${environment.apiUrl}/users/${this.auth.getCurrentUser().id}/projects`);
  }
}
