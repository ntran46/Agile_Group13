import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/User/";

@Component({
  selector: 'app-register',
  templateUrl: './UserRegister.component.html',
  // styleUrls: ['./register.component.css']
})

export class UserRegisterComponent implements OnInit {
  selectedGender: string = "male";
  _UserArray: Array<any>;
  _role: String;
  _username: String;
  _firstname: String;
  _lastname: String;
  _email: String;
  _password: any;
  _confirm: any;
  _gender: any;
  _address: string = '';
  _zipcode: any = '';
  _txtEmpPhone: any = '';
  _reqInfo: any;
  _http:HttpClient;
  _errorMessage:String = "";
  

  constructor(private http: HttpClient) { 
    this._http = http;
  }

  ngOnInit(): void {
  }

  RegisterUser() {
    console.log(this._password)
    console.log(this._confirm)
    // This free online service receives post submissions.
    let password = this._password
    let confirm  = this._confirm
    
    if (password == confirm) {
      this.http.post(BASE_URL + "RegisterUser",
          {
            username       : this._username,
            firstName      : this._firstname,
            lastName       : this._lastname,
            email          : this._email,
            password       : this._password,
            passwordConfirm: this._confirm,
            gender         : this._gender,
            address        : this._address,
            zipcode        : this._zipcode,
            txtEmpPhone    : this._txtEmpPhone,

          })
      .subscribe(
          // Data is received from the post request.0
          (data) => {
              // Inspect the data to know how to parse it.
              console.log("POST call successful. Inspect response.", JSON.stringify(data));
              // window.location.href = 'http://localhost:4200';
              this._errorMessage = data["errorMessage"];
              console.log(this._errorMessage)
          },
          // An error occurred. Data is not received.
          error => {
              this._errorMessage = error;
              console.log(error)
          });
    } else { console.log("Not match!")}

  }

}
