import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

const BASE_URL = "http://localhost:1337/User/";

export interface PeriodicElement {
    username: string;
    firstname: number;
    lastname: number;
    txtEmpPhone: string;
  }
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  templateUrl:'./userManagement.component.html',
  styleUrls: ['./Management.component.css']
  
})
export class userManagementComponent { 
  _UserArray: Array<any>;
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
  _reqInfo: any;
  _http:HttpClient;
  _errorMessage:String = "";
  position: number;
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'txtEmpPhone'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private http: HttpClient) {
      this._http = http;
      this.getAllUsers();
    }


  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAllUsers() {
      let url = BASE_URL + 'Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._UserArray = result.users;
              console.log(this._UserArray)
          },
  
          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }
    
}