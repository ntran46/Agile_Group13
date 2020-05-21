import { Component, Input }         from '@angular/core'
import { HttpClient, HttpHeaders }  from '@angular/common/http'
import { ApiService }               from '../ApiService';
import {Router}                     from "@angular/router";
import {Location }                  from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl:`./main.html`,
    styleUrls: ['./main.css']
})

export class MainComponent {
    public site  = 'http://localhost:1337/';
    password     = ' ';         
    username     = '';
    token        = '';
    roles        : Array<any> = [];
    _http        : HttpClient;
    _id          : Number = 1;
    rating       : Number=0;
    review       : Number=0;
    _eventName   : String=" ";
    _description : String="";
    _errorMessage: String = " ";
    _RestaurantItem   : any=[];
    reqInfo      : any = {};
    _apiService  : ApiService;
    _ReviewItem  : Array<any>;

  
    constructor(private http: HttpClient) {
        this._apiService = new ApiService(http, this);
        this._http = http;
        this.getAllRestaurants();
        if(this.reqInfo.roles){
            if(this.reqInfo.roles.includes("Manager")){
                this.getManagerData()
            }
        }
    }

    getAllRestaurants() {
        let url = this.site + 'Restaurant/Index'
        this._http.get<any>(url)
            .subscribe(result => {
                console.log(result.restaurants)
                for (var i =0; i<result.restaurants.length; i++){
                    console.log(result.restaurants[i])

                    if (result.restaurants[i][0].isApproved == 1){
                        this._RestaurantItem.push(result.restaurants[i])
                    }
                }                
            }, 
            error =>{
                this._errorMessage = error;
            })
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
            console.log(result.reqInfo)
        }
        else {
            console.log(JSON.stringify(result.errorMessage));
            alert("You are not authorized to exeucute this acction")
            window.location.href = '../login';
        }   
    }
  
    getManagerData() {  
        this._apiService.getData('User/ManagerAreaJwt', 
                                this.managerDataCallback);
    }
    // Callback needs a pointer '_this' to current instance.
    managerDataCallback(result, _this) {
        if(result.errorMessage == "") {
            _this.reqInfo = result.reqInfo;
            console.log(result.reqInfo)
        }
        else {
            alert(JSON.stringify(result.errorMessage)); 
        }
    }

}
