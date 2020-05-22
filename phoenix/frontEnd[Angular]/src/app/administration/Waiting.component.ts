import { Component, Input }         from '@angular/core'
import { HttpClient, HttpHeaders }  from '@angular/common/http'
import { ApiService }               from '../ApiService';

@Component({
    selector: 'app-login',
    templateUrl:`./Waiting.component.html`,
    styleUrls: ['./Waiting.component.css']
})

export class WaitingListComponent {
    public site         = 'http://localhost:1337/';
    password            = ' ';         
    username            = '';
    token               = '';
    roles               : Array<any> = [];
    _http               : HttpClient;
    _id                 : Number = 1;
    checkList           : any =[];
    _licenseChecked     : String="";
    _locationChecked    : String="";
    _nameChecked        : String="";
    _phoneChecked       : String="";
    _errorMessage       : String = " ";
    _RestaurantItem     : any =[];
    reqInfo             : any = {};
    _apiService         : ApiService;

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
                this._RestaurantItem = [];
                for (var i =0; i<result.restaurants.length; i++){
                    if (result.restaurants[i][0].isApproved == 0){
                        this._RestaurantItem.push(result.restaurants[i][0])
                    }
                }
            }, 
            error =>{
                this._errorMessage = error;
            })
    }

    updateWaitingItem(email, action, ID) {

        var checkBox = document.getElementById(ID).querySelectorAll('input')
        let _isApproved = 0;
        let _validationCheck = []

        if (action == 'Approved'){
            _isApproved = 1
        }
        else if (action == 'Declined'){
            _isApproved = 2
        }
        
        for (var i =0; i < checkBox.length; i++){
            if (! checkBox[i].checked){
                _validationCheck.push(checkBox[i])
            }
        }

        if(_validationCheck.length == 0){
            this.createRestaurantOwner(email, _isApproved, ID)
        }
        else{
            alert("All conditions must be checked before approving")
        }
    }

    setApproved(email, _isApproved, ID){
        let url = this.site + "Restaurant/approveRestaurant"
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

    createRestaurantOwner(email, _isApproved, ID){
        for (var i =0; i<this._RestaurantItem.length; i++){
            if (this._RestaurantItem[i].email == email){
                var newRestaurant = this._RestaurantItem[i]
            }
        }
        console.log(newRestaurant)

        var ResOwner = {
            username       : newRestaurant.email,
            firstName      : newRestaurant.restaurantName,
            lastName       : "",
            email          : newRestaurant.email,
            password       : "P@ssw0rd",
            passwordConfirm: "P@ssw0rd",
            gender         : 'Female',
            address        : newRestaurant.strAddress,
            zipcode        : newRestaurant.zipcode,
            txtEmpPhone    : newRestaurant.phoneNo,
            roles          : "RestaurantOwner"
        }

        this.http.post(this.site + "User/RegisterUser", ResOwner)
                .subscribe(
                    (data) => {
                        console.log("POST call successful. Inspect response.", JSON.stringify(data));
                        this._errorMessage = data["errorMessage"];
                        console.log(this._errorMessage)
                        this.setApproved(email, _isApproved, ID)
                    },
                    error => {
                        this._errorMessage = error;
                        console.log(error)
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
