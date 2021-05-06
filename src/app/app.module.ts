import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent, AppComponent, DownloadComponent, HeaderComponent, HomeComponent, InnerHeaderComponent, NewUserComponent, RegisterComponent,RelectedStudentDetailsComponent,ResetPwDComponent,StudentDetailsComponent, ViewPDfComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormBuilder, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconModule } from '@ant-design/icons-angular';
registerLocaleData(en);
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpModule } from '@angular/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ChartsModule } from 'ng2-charts';
import { FilterlistPipe } from './pipe/filter.pipe';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { GlobalService } from 'src/service/global.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
@NgModule({
  declarations: [
    AppComponent,RegisterComponent,AdminLoginComponent,HomeComponent,NewUserComponent,HeaderComponent,DownloadComponent,StudentDetailsComponent,RelectedStudentDetailsComponent,FilterlistPipe,InnerHeaderComponent,ViewPDfComponent,ResetPwDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzUploadModule,
    NzRadioModule,
    NzModalModule,
    NzButtonModule,
    IconModule,
    HttpModule,
    NzDropDownModule,
    RouterModule,
    NzSpinModule,
    AngularFileUploaderModule,
    NzMessageModule,
    NzPaginationModule,
    NzTabsModule,
    ChartsModule,
    NzNotificationModule,
    NgApexchartsModule,
    NzProgressModule,
    NzPopconfirmModule,
    NzDatePickerModule
  ],
  providers: [FormBuilder,GlobalService,
  {provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule { }
