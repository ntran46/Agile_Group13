import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort'
import {MatPaginator} from '@angular/material/paginator'

const BASE_URL = "http://localhost:1337/User/";



@Component({
  templateUrl:'./userManagement.component.html',
  styleUrls: ['./Management.component.css']
  
})

export class userManagementComponent implements OnInit, AfterViewInit { 
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
  
  public ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'txtEmpPhone', 'update', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {
      this._http = http;
    }

    ngOnInit() {
      this.getAllUsers();
    }
  
    ngAfterViewInit(): void {
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
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
              for (var i=0; i < this._UserArray.length; i++){
                this.ELEMENT_DATA.push(this._UserArray[i])
              }
              console.log(this.ELEMENT_DATA)
              this.dataSource.data = this.ELEMENT_DATA
          },
  
          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    public redirectToUpdate = (id: string) => {
    
    }
  
    public redirectToDelete = (id: string) => {
      
    }
    
}
export interface PeriodicElement {
}
