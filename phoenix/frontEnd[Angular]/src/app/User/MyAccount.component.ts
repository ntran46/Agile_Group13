import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component'


const BASE_URL = "http://localhost:1337/User/";

export interface PeriodicElement {
    username: string;
    firstname: number;
    lastname: number;
    txtEmpPhone: string;
  }
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  templateUrl:'./MyAccount.component.html',
  styleUrls: ['./MyAccount.component.css']
  
})
export class MyAccountComponent { 
  selectedGender: string = "male";
  _UserArray: any;
  _role: String;
  _username: String;
  _firstname: String;
  _lastname: String;
  _email: String;
  _password: any;
  _confirm: any;
  _gender: any;
  _address: string;
  _zipcode: any;
  _txtEmpPhone: any;
  reqInfo: any;
  _http:HttpClient;
  token         = '';
  _errorMessage:String = "";

  constructor(private http: HttpClient, AppComponent:AppComponent) {
      this._http = http;
      this.showContentIfLoggedIn()
      // setTimeout(() => {this.View();}, 200)
    }

    showContentIfLoggedIn() {
      if(sessionStorage.getItem('auth_token')!=null) {
          this.token   = sessionStorage.getItem('auth_token');
          this._UserArray = JSON.parse(sessionStorage.user)
      }
      else {
          this.token   = ''
          alert("Unauthorized Area");
          window.location.href = './login';
      }
  }

    Submit() {
      // let url = BASE_URL + 'EditMyAccount'
      // this._http.post(url, )
      //     // Get data and wait for result.
      //     .subscribe(result => {
      //         this._UserArray = result.users;

      //     },
  
      //     error =>{
      //       console.log(JSON.stringify(error));
      //       this._errorMessage = error;
      //     })
    }

    View(){
      document.getElementById("Save").style.visibility='visible'
      document.getElementById("Cancel").style.visibility='visible'
      document.getElementById("ViewTable").style.display='none'
      document.getElementById("EditTable").style.display='inline'
      document.getElementById("View").style.visibility='hidden'


    }

    Edit() {

      this.showContentIfLoggedIn()
      document.getElementById("View").style.display = "none";
      document.getElementById("Edit").style.display ="inline";
    }

    Cancel() {
      this.showContentIfLoggedIn()
      document.getElementById("ViewTable").style.display='inline'
      document.getElementById("EditTable").style.display='none'
      document.getElementById("View").style.visibility='visible'
      document.getElementById("Save").style.visibility='hidden'
      document.getElementById("Cancel").style.visibility='hidden'
    }
    
}