import { Component, Input }         from '@angular/core'
import { HttpClient, HttpHeaders }  from '@angular/common/http'
import { ApiService }               from '../ApiService';
import {Router}                     from "@angular/router";
import {Location }                  from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl:`./restaurantManagement.component.html`,
    styleUrls: ['../app.component.css']
})

export class RestaurantManagementComponent {
    public site     = 'http://localhost:1337/';
    password        = ' ';         
    username        = '';
    token           = '';
    roles           : Array<any> = [];
    _http           : HttpClient;
    _id             : Number = 1;
    _description    : String="";
    _errorMessage   : String = " ";
    _RestaurantItem : Array<any>;
    reqInfo         : any = {};
    _apiService     : ApiService;

  
    constructor(private http: HttpClient) {
        this._apiService = new ApiService(http, this);
        this._http = http;
        this.getAllRestaurants();
        this.getSecureData()
    }

    getAllRestaurants() {
        let url = this.site + 'Restaurant/Index'
        this._http.get<any>(url)
            .subscribe(result => {
                this._RestaurantItem = result.restaurants;
            }, 
            error =>{
                this._errorMessage = error;
            })
    }

    RedirectToWaitingList(){
        window.location.href = '../WaitingList';
    }

    deleteRestaurant(email) {

        const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
        "body": { email:email}
        };
        let url = this.site + "Restaurant/Delete"
        this.http.delete(url, httpOptions) 
                .subscribe(
                    (data) => {
                        this._errorMessage = data["errorMessage"];
                        console.log(JSON.stringify(data));
                        this.getAllRestaurants(); 
                    },
                    error  => {
                    console.log(JSON.stringify(error));
                    this._errorMessage = error; 
                    });
    }
     
    getSecureData() {  
        this._apiService.getData('User/SecureAreaJwt', 
                                this.secureDataCallback);
    }
    // Callback needs a pointer '_this' to current instance.
    secureDataCallback(result, _this) {
        if(result.errorMessage == "") {
            _this.secureData = result.secureData;
            _this.reqInfo = result.reqInfo;
        }
        else {
            console.log(JSON.stringify(result.errorMessage));
            alert("You are not authorized to exeucute this acction")
            window.location.href = '../login';
        }   
    }
}
