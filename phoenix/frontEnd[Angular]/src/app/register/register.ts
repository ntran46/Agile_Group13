import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
const BASE_URL = "http://localhost:1337/User/";

@Component({
  templateUrl:'./register.html',
  styleUrls:['./register.css']


})
export class Register { 
  _UserArray: Array<any>;
  _username: String;
  _role: String;
  _firstname: String;
  _lastname: String;
  _email: String;
  _password: any;
  _confirm: any;
  _gender: any;
  _address: string;
  _zipcode: any;
  _phone: any;
  _reqInfo: any;
  _http:HttpClient;
  _errorMessage:String = "";

  constructor(private http: HttpClient) {
      this._http = http;
      this.getAllUsers();

    }

    getAllUsers() {
      let url = BASE_URL + 'Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._UserArray = result.users;
          },
  
          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    clicked() {
      window.location.href = "http://localhost:4200/register/register_rest"
    }
    
    RegisterUser() {
      console.log(this._password)
      console.log(this._confirm)
      console.log(this._firstname)
      console.log(this._lastname)

      // This free online service receives post submissions.
      let password = this._password
      let confirm =  this._confirm
      
      if (password == confirm) {
        this.http.post(BASE_URL + "RegisterUser",
            {
              username: this._username,
              firstName: this._firstname,
              lastName: this._lastname,
              email: this._email,
              password: this._password,
              passwordConfirm: this._confirm,
              roles: this._role,
              gender: this._gender,
              // address: this._address,
              // zipcode: this._zipcode,
              // phone: this._phone,
              reqInfo: this._reqInfo
            
            })
        .subscribe(
            // Data is received from the post request.0
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", JSON.stringify(data));
                window.location.href = 'http://localhost:4200/main/main';
                this._errorMessage = data["errorMessage"];
                this.getAllUsers();

            },
            // An error occurred. Data is not received.
            error => {
                this._errorMessage = error;
            });
      } else { console.log("Not match!")}

    }
}