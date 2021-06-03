import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent, RegisterComponent,AdminLoginComponent, HomeComponent,DownloadComponent,StudentDetailsComponent, NewUserComponent, ViewPDfComponent, ResetPwDComponent,RenewalDetailsComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
       { path: '', component: AdminLoginComponent },
       { path: 'login', component: AdminLoginComponent },
      { path: 'registration', component: RegisterComponent },
      { path: 'downloadpdf', component: DownloadComponent },
      { path: 'studentdetails', component: StudentDetailsComponent },
      { path: 'viewdetails', component: ViewPDfComponent },
      { path: 'newuser', component: NewUserComponent },
      { path: 'home', component: HomeComponent },
      { path: 'passwordreset', component: ResetPwDComponent },
      { path: 'studentrenewaldetails', component: RenewalDetailsComponent },
      // { path: 'success', component: SuccessComponent }
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
