import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/operator/filter';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = environment.domain;
  authToken: any;
  user: any;
  options;
  currentUser = {};
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private subject = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = {
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': "Basic " + this.authToken // Attach token
      })
     
   }  
   console.log(this.options)
  }
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
  // Function to create headers, add token, to be used in HTTP requests
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  getToken() {
    return localStorage.getItem('token');
  }
  // Function to get token from client local storage
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token; // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerUser(user) {
   
    return this.http.post(this.domain + 'api/register', user)
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.domain + 'api/checkUsername/' + username)
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + 'api/checkEmail/' + email)
  }

  // Function to login user
  login(user) {
    console.log(user)
    return this.http.post(this.domain + 'api/login', user, { headers: this.headers })
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  
  // Function to get user's profile data
  getProfile() {
    
    return this.http.get(this.domain + 'api/profile', { headers: this.headers })
  }
  getUsers(id) {
    
    return this.http.get(this.domain + 'api/profile/' + id, this.options)
  }
  
  // Function to get public profile data
  getPublicProfile(username) {
    
    return this.http.get(this.domain + 'api/publicProfile/' + username, this.options)
    
  }
  get loggedIn() {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }
}
