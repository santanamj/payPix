import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard,
    private toastr: ToastrService
  ) { 
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==true){
       console.log(data.success)
       this.router.navigate(['/dashboard']);
      }
     
    }) 
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  
  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }
  
  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }
  
  // Functiont to submit form and login user
  onLoginSubmit() {
    const login = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    console.log('component', login)
    // Function to send login data to API
    this.authService.login(login).subscribe((data: any) => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
        this.toastr.error('Nome do usuário ou senha incorreta', 'error',{
          timeOut: 3000
        });
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          // Check if user was redirected or logging in for first time
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.authService.sendClickEvent();
            this.router.navigate(['/dashboard']); // Navigate to dashboard view
          }
        }, 2000);
      }
    });
   
  }
  
  ngOnInit() {
    // On page load, check if user was redirected to login
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
  }

}
