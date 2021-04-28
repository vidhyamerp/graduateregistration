import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent, RegisterComponent,AdminLoginComponent, HomeComponent,DownloadComponent,StudentDetailsComponent, NewUserComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
       { path: '', component: AdminLoginComponent },
       { path: 'login', component: AdminLoginComponent },
      { path: 'registration', component: RegisterComponent },
      { path: 'downloadpdf/:id', component: DownloadComponent },
      { path: 'studentdetails', component: StudentDetailsComponent },
      { path: 'newuser', component: NewUserComponent },
      { path: 'home', component: HomeComponent }
    ]},
// {
//   path: 'registration',
//   component: RegisterComponent,
// },
// {
//   path: 'adminlogin',
//   component: AdminLoginComponent,
// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }