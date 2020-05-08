import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const BASE_URL = "http://localhost:1337/Restaurant/";


@Component({
  selector: 'app-register',
  templateUrl: './RestaurantRegister.component.html',
   styleUrls: ['./RestaurantRegister.component.css']
})

export class RestaurantRegisterComponent implements OnInit {
  _UserArray: Array<any>;
  _role: String;
  _email: String;
  _restaurantName: String;
  _strAddress: string = '';
  _city: any;
  _zipcode: any = '';
  _phoneNo: any = '';
  _menu: String = '';
  _description:String = '';
  _license: String = '';
  _branchLocation: any = '';
  _employees: any = '';
  _reqInfo: any;
  _http:HttpClient;
  _errorMessage:String = "";

  constructor(private http: HttpClient) { 
    this._http = http;
  }

  ngOnInit(): void {
  }

  RegisterRestaurant() {

    this.http.post(BASE_URL + "RegisterRestaurant",
        {
          email       : this._email,
          restaurantName : this._restaurantName,
          strAddress  : this._strAddress,
          city        : this._city,
          zipcode     : this._zipcode,
          phoneNo     : this._phoneNo,
          menu        : this._menu,
          description : this._description,
          license     : this._license,
          branchLocation  : this._branchLocation,
          employees   : this._employees,
        })
    .subscribe(
        // Data is received from the post request.0
        (data) => {
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            window.location.href = 'http://localhost:4200/main';
            this._errorMessage = data["errorMessage"];
            console.log(this._errorMessage)
        },
        // An error occurred. Data is not received.
        error => {
            this._errorMessage = error;
            console.log(error)
        });
  }

}
