import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { AdminRegisterComponent } from './component/admin-register/admin-register.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { PostListingComponent } from './component/post-listing/post-listing.component';
import { PostCreateComponent } from './component/post-create/post-create.component';
import { PostOwnedComponent } from './component/post-owned/post-owned.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';
import { PostInfoComponent } from './component/post-info/post-info.component';
import { RentalCreateComponent } from './component/rental-create/rental-create.component';
import { RentalOwnedComponent } from './component/rental-owned/rental-owned.component';
import { RentalInfoComponent } from './component/rental-info/rental-info.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AdminRegisterComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    PostListingComponent,
    PostCreateComponent,
    PostOwnedComponent,
    PostEditComponent,
    PostInfoComponent,
    RentalCreateComponent,
    RentalOwnedComponent,
    RentalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
