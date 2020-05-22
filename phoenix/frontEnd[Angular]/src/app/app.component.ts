import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';


@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,

  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "Homework 3";
    password      = ' ';         
    username      = '';
    loginInfo     = false;
    token         = '';
    message       = '';
    _user         : any;
    roles         : Array<any> = [];
    link          : string;
    secureData    : string = '';
    managerData   : string = '';
    reqInfo       : any    = {};
    msgFromServer : string = '';
    _apiService   : ApiService;

    public site='http://localhost:1337/';

  
    constructor(private http: HttpClient) {
        // Pass in http module and pointer to AppComponent.
        this._apiService = new ApiService(http, this);
        this.showContentIfLoggedIn();
    }  
    
    //------------------------------------------------------------
    // Either shows content when logged in or clears contents.
    //------------------------------------------------------------
    showContentIfLoggedIn() {
        // Logged in if token exists in browser cache.
        if(sessionStorage.getItem('auth_token')!=null) {
            this.token   = sessionStorage.getItem('auth_token');
            this._user   = JSON.parse(sessionStorage.getItem('user'))
            console.log(this._user)
            console.log(this._user.firstName)
            console.log(this._user.lastName)


            this.getSecureData()
        }
        else {
            this.token   = ''
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
            console.log(_this.reqInfo)
        }
        else {
            console.log(JSON.stringify(result.errorMessage));
            alert("Unauthorized Area");
            window.location.href = './login';
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
            console.log(result.reqInfo.roles.includes("Manager"))
        }
        else {
            console.log(JSON.stringify(result.errorMessage));
            alert("Unauthorized Area");
            window.location.href = './Main';
        }
    }
      
    //------------------------------------------------------------
    // Log user out. Destroy token.
    //------------------------------------------------------------
    logout() {
        sessionStorage.clear();
        this.showContentIfLoggedIn();

        // Clear data.
        this.secureData    = ""; 
        this.managerData   = "";
        this.reqInfo       = {};
        this.msgFromServer = "";
    }
}
