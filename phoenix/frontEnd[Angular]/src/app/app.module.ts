import { BrowserModule }     from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';
import { AppComponent }      from './app.component';
import { FormsModule }       from '@angular/forms';
import { NgModule }          from '@angular/core';
import { AppRoutingModule }  from './app.routing';
import { Register }          from './register/register';
import { Login }             from './login/login';

@NgModule({
  declarations: [
    AppComponent,
    Register,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }