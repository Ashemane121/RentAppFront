import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
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
import { AdminUsersComponent } from './component/admin-users/admin-users.component';
import { AdminPostsComponent } from './component/admin-posts/admin-posts.component';
import { AdminRequestsComponent } from './component/admin-requests/admin-requests.component';
import { AdminPostInfoComponent } from './component/admin-post-info/admin-post-info.component';
import { AdminUserInfoComponent } from './component/admin-user-info/admin-user-info.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserProfileEditComponent } from './component/user-profile-edit/user-profile-edit.component';
import { UserProfileSettingsComponent } from './component/user-profile-settings/user-profile-settings.component';
import { UserProfileIdentityComponent } from './component/user-profile-identity/user-profile-identity.component';
import { UserProfilePaymentComponent } from './component/user-profile-payment/user-profile-payment.component';



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
    RentalInfoComponent,
    AdminUsersComponent,
    AdminPostsComponent,
    AdminRequestsComponent,
    AdminPostInfoComponent,
    AdminUserInfoComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    UserProfileSettingsComponent,
    UserProfileIdentityComponent,
    UserProfilePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AdminUserInfoComponent,
    AdminPostInfoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
