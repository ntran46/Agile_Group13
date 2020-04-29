import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
const BASE_URL = "http://localhost:1337/Product/";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'myapp';
  roles: Array<any> = [];
  user: any = {};
  timestamp: String = '';
  username = '';
  password = '';
  token = '';
  message = 'Not logged in.';
  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';
  _apiService: ApiService;
  public site = 'http://localhost:1337/';

  constructor(private http: HttpClient) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.showContentIfLoggedIn();
  }

  updateLinks() {
    let USER_KEY = "user";
    let ROLE_KEY = "roles";
    let TIME_KEY = "currentTime";

    let user = JSON.parse(sessionStorage.getItem(USER_KEY));
    let roles = JSON.parse(sessionStorage.getItem(ROLE_KEY));


    if (user == null || roles == null) {
      this.user = {};
      this.roles = [];
    } else {
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY))
      this.roles = JSON.parse(sessionStorage.getItem(ROLE_KEY));
    }

    // Read the time from storage.
    // I am updating the time only to prove that updateLinks() 
    // gets called every time you click on a different link in the 
    // application.
    sessionStorage.setItem(TIME_KEY, JSON.stringify(new Date()));
    this.timestamp = sessionStorage.getItem(TIME_KEY);
  }

  logout() {
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.secureData = "";
    this.managerData = "";
    this.reqInfo = {};
    this.msgFromServer = "";
    window.location.href = 'http://localhost:4200/main/main'
  }

  //------------------------------------------------------------
  // Either shows content when logged in or clears contents.
  //------------------------------------------------------------
  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.message = "The user has been logged in."
    }
    else {
      this.message = "Not logged in.";
      this.token = ''
    }
  }

  getSecureData() {
    this._apiService.getData('User/SecureAreaJwt',
      this.secureDataCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  secureDataCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.secureData = result.secureData;
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

  getManagerData() {
    this._apiService.getData('User/ManagerAreaJwt',
      this.managerDataCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  managerDataCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.reqInfo = result.reqInfo;
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

  postSecureMessage() {
    let dataObject = {
      msgFromClient: 'hi from client'
    }
    this._apiService.postData('User/PostAreaJwt', dataObject,
      this.securePostCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  securePostCallback(result, _this) {
    if (result.errorMessage == '') {
      _this.msgFromServer = result['msgFromServer'];
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

}

