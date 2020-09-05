import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginInterface, RegisterInterface, TokenInterface } from '../interfaces/auth.interface';
import { Response } from '../interfaces/response.interface';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get isLoggedIn(): boolean {
    return this.token && jwtDecode(this.token).exp > Date.now() / 1000;
  }

  public get token(): string {
    return localStorage.getItem('token');
  }

  public get user(): any {
    return this.token && jwtDecode(this.token);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(credentials: LoginInterface): void {
    this.http.post<Response<TokenInterface>>
      (environment.apiUrl + 'login', credentials)
      .subscribe(
        (response: any) => this.setToken(response),
        (error: Error) => console.error(error.message)
      );
  }

  public register(credentials: RegisterInterface): void {
    this.http.post<Response<TokenInterface>>
      (environment.apiUrl + 'register', credentials)
      .subscribe(
        (response: any) => this.setToken(response),
        (error: Error) => console.error(error.message)
      )
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  public static getAuthToken(): any {
    return localStorage.getItem('token') ? { 'Authorization': 'Bearer ' + localStorage.getItem('token') } : {};
  }

  private setToken({ data }) {
    localStorage.setItem('token', data.token);
    this.router.navigate(['/']);
  }

}
