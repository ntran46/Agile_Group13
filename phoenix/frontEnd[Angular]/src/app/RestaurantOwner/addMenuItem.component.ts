import { Component, Input }        from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiService}               from '../ApiService'


const BASE_URL ="http://localhost:1337/Restaurant/";

@Component({

    templateUrl:'./addMenuItem.component.html',
    styleUrls: ['../app.component.css']
})

export class AddMenuItemComponent {
  _restaurant  :any =[];
  _http        :HttpClient;
  _id          :Number;
  _category    :String;
  _price       :Number;
  _productName :String;
  _description :String;
  _errorMessage:String = "";
  _UserArray   : any;
  token
  reqInfo      : any = {};
  _apiService  : ApiService;
  panelOpenState = false;
  email: any;
  menu : any =[];


  constructor(private http: HttpClient) {
      this._apiService = new ApiService(http, this);
      this._http = http;
      this.showContentIfLoggedIn()
      this.getSecureData()
    }
  
  ngOnInit() {
    this._id = 1;
    this._price = 0.0;
    this._productName = "Mango";
  }

  getMenuItems(email) {

    let url = BASE_URL + 'RestaurantInfo?email=' + email
    this._http.get<any>(url)
        .subscribe(result => {
            this.menu = []
            this._restaurant = result.obj;
            this.menu = this._restaurant.menu
  
            console.log(this.menu)
        }, 
        error =>{
            console.log(error)
            this._errorMessage = error;
        })
  }

  addMenuItems() {

      this.http.post(BASE_URL + "AddMenuItem",
          {
              email      : this._restaurant.email,
              category   : this._category,
              description: this._description,
              productName: this._productName,
              price      : this._price
          })
            .subscribe(
                (data) => {
                    console.log(JSON.stringify(data));
                    this._errorMessage = data["errorMessage"];
                    this.getMenuItems(this._restaurant.email)

                },
                error => {
                    console.log(error)
                    this._errorMessage = error;                
                });
  }

  deleteItem(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      "body": { _id:_id}
    };
    let url = BASE_URL + "Delete"

    this.http.delete(url, httpOptions) 
            .subscribe(
                (data) => {
                    this._errorMessage = data["errorMessage"];
                },
                error  => {
                this._errorMessage = error; 
                });
  }

  showContentIfLoggedIn() {
    if(sessionStorage.getItem('auth_token')!=null) {
        this.token   = sessionStorage.getItem('auth_token');
        this._UserArray = JSON.parse(sessionStorage.user)
        console.log(this._UserArray)
        this.email = this._UserArray.email
        this.getMenuItems(this._UserArray.email)
    }
    else {
        this.token   = ''
        alert("Unauthorized Area");
        window.location.href = './login';
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