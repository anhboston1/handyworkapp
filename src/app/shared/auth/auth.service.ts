import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

interface UserCredentials {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
  ttl: number;
}


@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any>;

  private authToken: BehaviorSubject<string>;
  private jwtHelper: JwtHelperService;
  private refreshTokenInterval: Subscription;
  constructor(private http: HttpClient, public router: Router) {
    this.currentUser = new BehaviorSubject<any>(null);

    this.authToken = new BehaviorSubject<string>(null);
    this.jwtHelper = new JwtHelperService();
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }
  signup(data) {
    let _data = {
      email: data.email,
      password: data.password,
      firstName: data.firstname,
      lastName: data.lastname
    }
    console.log(_data);
    return this.http.post(`${environment.apiUrl}/users/signup`, _data, { responseType: 'text' });
  }
  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    //uncomment above firebase auth code and remove this temp code
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true);
      }, 1000);
    });

  }

  login(userCredentials: UserCredentials): Observable<void> {
    return this.http
      .post<TokenResponse>(environment.apiUrl + '/users/login', userCredentials)
      .pipe(
        map((res) => {
          const user = this.jwtHelper.decodeToken(res.token);
          console.log("res.token = " + res.token);
          console.log(user);
        
          this.authToken.next(res.token);
          this.currentUser.next(user);         

          //this.setupRefreshTokenInterval(res.ttl - 30);
        }),
      );
  }

  logout(): Observable<void> {
    return this.http.post(environment.apiUrl + '/users/logout', null).pipe(
      map(() => {
        this.authToken.next(null);
        this.currentUser.next(null);

        this.refreshTokenInterval.unsubscribe();
        this.refreshTokenInterval = null;
      }),
    );
  }

  isAuthenticated() {
    return true;
  }

  getToken(): string {
    return this.authToken.value;
  }

  getCurrentUser(): any {
    return this.currentUser.value;
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
