import { Component, Input } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiService } from '../ApiService';
import {Router} from "@angular/router";
import {Location } from "@angular/common";

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
    _eventDate   : String=" ";
    _eventTime   : String=" ";
    _eventName   : String=" ";
    _description : String="";
    _errorMessage: String = " ";
    _RestaurantItem   : Array<any>;
    reqInfo      : any = {};
    _apiService  : ApiService;

  
    constructor(private http: HttpClient) {
        // Pass in http module and pointer to AppComponent.
        this._apiService = new ApiService(http, this);
        this._http = http;
        this.getAllRestaurants();
        if(this.reqInfo.roles){
            if(this.reqInfo.roles.includes("Manager")){
                this.getManagerData()
            }
        }
    }

    //Get all items in the Event table
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
  
    //Subcribe to an event
    //Redirect to login page if user is not authenticated
    // AttendCaller(_id){
    //     this.getSecureData()
    //     setTimeout(() => {this.Attend(_id);}, 100)
    // }

    // Attend(_id){
    //     if (this.reqInfo == undefined) {
    //         alert("You need to login to subscribe to an event")
    //         window.location.href = '../login';
    //     }
    //     else{
    //         let check = false;
    //         for (const item of this._eventItem){
    //             if (item._id == _id){
    //                 for (var i = 0; i < item.attendee.length; i++){
    //                     if (item.attendee[i] == this.reqInfo.username){
    //                         check = true;
    //                         break;
    //                 }} 
    //                 if (!check && this.reqInfo.username!= null){
    //                     item.attendee.push(this.reqInfo.username)
    //                     var tempObj = item;
    //                 }
    //             }
    //         }
    //         let url = this.site + 'Event/UpdateEvent'
    //         this._http.post(url, tempObj)
    //                 .subscribe(
    //                     (data) => {
    //                         console.log("POST call successful. Inspect response.", 
    //                                     JSON.stringify(data));
    //                         if (data["errorMessage"].message){
    //                         this._errorMessage = data["errorMessage"].message
    //                         } else{
    //                         this._errorMessage = data["errorMessage"]
    //                         }
    //                         this.getAllEvents();
    //                     },
    //                     error => {
    //                         this._errorMessage = error;                
    //                     });
    //     }

    // }
    
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
