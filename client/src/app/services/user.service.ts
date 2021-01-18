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
export class UserService {
  domain = environment.domain;
  authToken: any;
  user: any;
  options;
  currentUser = {};
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
 
  constructor(
    private http: HttpClient
  ) { 
   
  }
}
