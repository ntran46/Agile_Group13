import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { RouterModule, Routes } from  '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }  from '@angular/common/http';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyMaterialModule }       from  './material.module';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error.component'
import { FormsModule }    from '@angular/forms';
import { UserRegisterComponent } from './register/UserRegister.component';
import { userManagementComponent } from './administration/userManagement.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const  appRoutes:  Routes  = [
  {path: 'login', component:  LoginComponent},
  {path: 'UserRegister', component: UserRegisterComponent},
  {path: 'UserManagement', component: userManagementComponent},
  {path:  '', redirectTo:  '/login', pathMatch:  'full'},];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, ErrorComponent, UserRegisterComponent, userManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,MyMaterialModule,FormsModule,HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    )
    
  ],
  entryComponents: [ErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
