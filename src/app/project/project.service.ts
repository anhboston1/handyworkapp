import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, public router: Router) { }
  create(data) {
    return this.http.post(`${environment.apiUrl}/projects`, data, { responseType: 'text' });
  }
  getMyProjects(id) {
    return this.http.get(`${environment.apiUrl}/users/${id}/projects`);
  }
}
