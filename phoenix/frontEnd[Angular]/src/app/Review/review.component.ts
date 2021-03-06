import {Component, OnInit} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ApiService} from '../ApiService'
import {AppComponent } from '../app.component'
import { ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-loign',
    templateUrl: `./review.component.html`,
    styleUrls: ['./review.component.css']
})

export class ReviewComponent {
    public site   = 'http://localhost:1337/Restaurant/'
    _http        : HttpClient;
    rating       : Number=0;
    review       : Number=0;
    route        : ActivatedRoute
    _RestaurantItem   : any=[];
    reqInfo      : any = {};
    _apiService  : ApiService;
    _ReviewItem  : any=[];

    _errorMessage  : String = "";

    constructor(private http: HttpClient,AppComponent:AppComponent, route: ActivatedRoute) {
        this._apiService = new ApiService(http, this);
        this._http = http;
        this.route = route
        this.getReviews(this.route.snapshot.params['license']);
    }

    getReviews(license){
        console.log(license)
        let url = this.site + 'ReviewDetail?license=' + license
        this.http.get<any>(url)
            .subscribe(result => {
                this._RestaurantItem = result.restaurant.obj
                this._ReviewItem = result.restaurant.obj.comments
                console.log(this._ReviewItem)
                console.log(result.restaurant)
            }, 
            error =>{
                this._errorMessage = error;
            })
    }

    WriteReview(license){
        window.location.href = '../WriteReviews/' + license;
    }

    Menu(RestaurantID){
        window.location.href = '../Main';
    }

    // getSecureData() {  
    //     this._apiService.getData('User/SecureAreaJwt', 
    //                             this.secureDataCallback);
    // }
    // // Callback needs a pointer '_this' to current instance.
    // secureDataCallback(result, _this) {
    //     if(result.errorMessage == "") {
    //         _this.secureData = result.secureData;
    //         _this.reqInfo = result.reqInfo;
    //         console.log(result.reqInfo)
    //     }
    //     else {
    //         console.log(JSON.stringify(result.errorMessage));
    //         alert("You are not authorized to exeucute this acction")
    //         window.location.href = '../login';
    //     }   
    // }

}

