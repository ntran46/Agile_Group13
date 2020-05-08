import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = "http://localhost:1337/User/";

@Component({
  templateUrl:'./login.html',
  styleUrls: ['./login.css']

})
export class Login { 
  _http: HttpClient;
  _email: String;
  _password: String;
  _token = '';
  _errorMessage: String = "";
  message = 'Not logged in.';

  constructor(private http: HttpClient) {
      this._http = http;

    }

  login() {
    let url = "http://localhost:1337/auth";

    // This free online service receives post submissions.
    this.http.post(url, {
      email:  this._email,
      password:  this._password,
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data['user']));

          if(data["token"]  != null)  {
            this._token = data["token"];

            sessionStorage.setItem('auth_token', data["token"]);
            sessionStorage.setItem('user', JSON.stringify(data["user"]))
            sessionStorage.setItem('roles', JSON.stringify(data["user"]["roles"]))
           
            this.message = "The user has been logged in.";
            window.location.href = 'http://localhost:4200/Main';
          }
        },
        // An error occurred. Data is not received. 
        error => {
          console.log(error)
          this._errorMessage = 'Error: Invalid username or password.';
        });
  }
}