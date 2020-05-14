import { Component, Input } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiService } from '../ApiService';

@Component({
    selector: 'app-login',
    templateUrl:`./Waiting.component.html`,
    styleUrls: ['../app.component.css']
})

export class WaitingListComponent {
    public site  = 'http://localhost:1337/';
    password     = ' ';         
    username     = '';
    token        = '';
    roles        : Array<any> = [];
    _http        : HttpClient;
    _id          : Number = 1;
    checkList    : any =[];
    _licenseChecked   : String="";
    _locationChecked   : String="";
    _nameChecked   : String="";
    _phoneChecked : String="";
    _errorMessage: String = " ";
    _RestaurantItem   : any =[];
    reqInfo      : any = {};
    _apiService  : ApiService;

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
                for (var i =0; i<result.restaurants.length; i++){
                    if (result.restaurants[i][0].isApproved == 0){
                        this._RestaurantItem.push(result.restaurants[i][0])
                    }
                }
                console.log(this._RestaurantItem)
            }, 
            error =>{
                this._errorMessage = error;
            })
    }

    updateWaitingItem(email, action, ID) {
        var checkBox = document.getElementById(ID) as HTMLInputElement;
        let _isApproved = 0;
        if (action == 'Approved'){
            _isApproved = 1
        }
        else if (action == 'Declined'){
            _isApproved = 2
        }

        if(checkBox.checked){

            let url = this.site + "Restaurant/Update"
            this.http.post(url, 
                    { email: email,
                      _id  : ID,
                      isApproved: _isApproved
                    }) 
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
        else{
            alert("All conditions should be checked before approving")
        }

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
