import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { RouterModule, Routes } from  '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }  from '@angular/common/http';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyMaterialModule }       from  './material.module';

import { AppComponent }   from './app.component';
import { MainComponent } from './Main/app.main'
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error.component'
import { FormsModule }    from '@angular/forms';
import { UserRegisterComponent } from './register/UserRegister.component';
import { MyAccountComponent } from './User/MyAccount.component';
import { userManagementComponent } from './administration/userManagement.component';
import { RestaurantRegisterComponent } from './register/RestaurantRegister.component';
import { RestaurantManagementComponent } from './administration/restaurantManagement.component';
import { WaitingListComponent } from './administration/Waiting.component';
import { ReviewComponent} from './Review/review.component'
import { WriteReviewComponent} from './Review/writeReviews.component'


import { ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const  appRoutes:  Routes  = [
  {path: 'login', component:  LoginComponent},
  {path: 'Main', component:  MainComponent},
  {path: 'UserRegister', component: UserRegisterComponent},
  {path: 'MyAccount', component: MyAccountComponent},
  {path: 'RestaurantRegister', component: RestaurantRegisterComponent},
  {path: 'UserManagement', component: userManagementComponent},
  {path: 'RestaurantManagement', component: RestaurantManagementComponent},
  {path: 'WriteReviews', redirectTo: 'WriteReviews/',pathMatch: 'full',},
  {path: 'WriteReviews', children: [{path: ':license', component: WriteReviewComponent,},]},
  {path: 'ViewReview', redirectTo: 'ViewReview/',pathMatch: 'full',},
  {path: 'ViewReview', children: [{path: ':license', component: ReviewComponent,},]},
  {path: 'WaitingList', component:WaitingListComponent},

  {path:  '', redirectTo:  '/Main', pathMatch:  'full'},
  // {path: '**', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,MainComponent,MyAccountComponent,RestaurantManagementComponent,ReviewComponent,WriteReviewComponent,
    LoginComponent, ErrorComponent, UserRegisterComponent, userManagementComponent,RestaurantRegisterComponent,
    WaitingListComponent,
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
