import { Component, Input }         from '@angular/core'
import { HttpClient, HttpHeaders }  from '@angular/common/http'
import { ApiService }               from '../ApiService';
import {Router}                     from "@angular/router";
import {Location }                  from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl:`./RestList.component.html`,
    styleUrls: ['./RestList.component.css']
})

export class RestaurantListComponent {
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
}
