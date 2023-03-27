import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PostListingComponent } from './component/post-listing/post-listing.component';
import { PostCreateComponent } from './component/post-create/post-create.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';
import { PostOwnedComponent } from './component/post-owned/post-owned.component';
import { PostInfoComponent } from './component/post-info/post-info.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminRegisterComponent } from './component/admin-register/admin-register.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { RentalCreateComponent } from './component/rental-create/rental-create.component';
import { RentalInfoComponent } from './component/rental-info/rental-info.component';
import { RentalOwnedComponent } from './component/rental-owned/rental-owned.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'admin/register', component:AdminRegisterComponent},
  {path:'admin/login', component:AdminLoginComponent},
  {path:'admin/dashboard', component:AdminDashboardComponent},
  {path:'posts', component:PostListingComponent},
  {path:'posts/add', component:PostCreateComponent, canActivate:[AuthGuard]},
  {path:'posts/owned', component:PostOwnedComponent, canActivate:[AuthGuard]},
  {path:'posts/edit/:id', component:PostEditComponent, canActivate:[AuthGuard]},
  {path:'posts/info/:id', component:PostInfoComponent},
  {path:'rental/owned', component:RentalOwnedComponent, canActivate:[AuthGuard]},
  {path:'rental/create/:id', component:RentalCreateComponent, canActivate:[AuthGuard]},
  {path:'rental/info/:id', component:RentalInfoComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
