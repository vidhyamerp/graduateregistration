import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Injectable, Input, ViewChild, ViewEncapsulation, SecurityContext, ElementRef, AfterViewInit, ViewChildren, QueryList, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";
import { DomSanitizer } from '@angular/platform-browser';
import { Selected } from './database/database.object';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
declare function myFunction(aadhar:any):any ;
import { GlobalService } from 'src/service/global.service';
import { formatDate } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {

  }
  log(): void {
    console.log('click dropdown button');
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdata')){
         
    }
   }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})

export class HomeComponent {
  agreedata = new FormControl('', [Validators.required]);
  user:any= {}
  getuser: any;
  response: any;
  receiptdata: any;
  receipturl: any;
  constructor( private router: Router, private httpClient: HttpClient,private elRef: ElementRef, private renderer: Renderer2,private currentUser: GlobalService) {
    // this.api = `${environment.api_url}/upload`
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggedusermy',this.getuser)
  }
  
  async registernew() {
    if (!this.agreedata.value) {
      window.alert('Please Agree to Continue')
      return
    }
    this.router.navigate(['/registration'])
  }
get(){
  let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
        this.httpClient.get(api).subscribe((res: any) => {
         console.log(res)
        this.response = res.data
        });
}
  Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
  agree(e: any) {
    if (e) {
      console.log(e)
    }
    console.log('else')
  }
 
  ngOnInit() {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
      this.get()
      this.GetReceipt()
  }
  GetReceipt() {
    let api = `${environment.api_url}/api/checkpaymentregister/${this.getuser.id}`;
    this.httpClient.get(api).subscribe((res: any) => {
     this.receiptdata = res.data
     
    });
  }
  receipt(){
    if(this.receiptdata){
      this.receipturl = `${environment.api_url}/api/downloadreceipt/${this.getuser.id}`;
      window.open(this.receipturl)
    }
  }
}
@Component({
  selector: 'app-innerheader',
  templateUrl: './innerheader.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class InnerHeaderComponent  {

}                                           
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class HeaderComponent {
  adminlogin: any;
  showbutton: boolean = false
  register: any;
  href: string;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href === '/home'){
      this.showbutton = true;
    }
  }
  redirect() {
    this.router.navigate(['/login'])
  }
  back() {
    this.router.navigate([''])
  }
  ngOnInit() {

  }
  Renewallogin(){
    this.router.navigate(['/renewallogin'])
  }
  Register(){
    this.router.navigate(['/newuser']);
  }
  Login(){
    this.router.navigate(['']);
  }
}
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})

export class AdminLoginComponent {
  validateForm = new FormGroup({})
  emailerror: boolean = false;
  passerror: boolean = false;
  response: any;
  id: any;
  failed: any;
  loginloading:boolean = false;
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService,private currentUser: GlobalService) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      user_type: ['new_user'],
      remember: [true]
    });
  }
  ngOnInit() { }
  Reset(){
    this.router.navigate(['/passwordreset'])
  }
   viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
   setCookie(id:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = id + "=" + (value || "")  + expires + "; path=/";
}
 getCookie(name:any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
  async submitForm() {
    
    console.log(this.validateForm)
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      // this.loginloading = false;
    }
    // if (this.validateForm.valid) {
    //   this.router.navigate(['/studentdetails'])
    // } else {
    //   return
    // }
    console.log(this.validateForm.value)
    let url = `${environment.api_url}/api/login`;
    this.http.post(url, this.validateForm.value).subscribe((res: any) => {
      this.loginloading = true
      this.response = res
     
      console.log("response", this.response)
      if (this.response.data) {
        this.loginloading = false
        this.id = this.response.data
        if(this.id.role != 'authority'){
        let api = `${environment.api_url}/api/edit/${this.id.id}`;
        this.http.get(api).subscribe((res: any) => {
         console.log(res)
         if(res.data){
          sessionStorage.setItem('userdata', JSON.stringify(this.id));
          this.setCookie("user_id",this.id.id,30);
          this.setCookie("email",res.data.email,30);
          this.setCookie("mobile_no",res.data.mobile_no,30);
          this.router.navigate(['/registration'])
         }
        //  if(res.data.is_submit === 1){
        //   this.router.navigate(['/viewdetails'])
        //  }
         else{
          this.router.navigate(['/home'])
          sessionStorage.setItem('userdata', JSON.stringify(this.id));
          this.setCookie("user_id",res.data.id,30);
          this.setCookie("email",res.data.email,30);
          this.setCookie("mobile_no",res.data.mobile_no,30);
         }
        });
        this.currentUser.setUser(this.id);
        sessionStorage.setItem('userdata', JSON.stringify(this.id));
        this.setCookie("user_id",res.data.id,30);
        this.setCookie("email",res.data.email,30);
        this.setCookie("mobile_no",res.data.mobile_no,30);
      }
      else{
        this.router.navigate(['/studentdetails'])
        this.currentUser.setUser(this.id);
        sessionStorage.setItem('userdata', JSON.stringify(this.id));
        this.setCookie("user_id",res.data.id,30);
        this.setCookie("email",res.data.email,30);
        this.setCookie("mobile_no",res.data.mobile_no,30);
      }
    }
     else {
        this.failed = this.response.falied
        this.loginloading = false;
      }
    });
  
  // ValidateEmail(control: AbstractControl) {
  //   if (control.value === 'adminbu@gmail.com') {
  //     return false;
  //   } else {
  //     return { emailExists: true };
  //   }
  // }
  // ValidatePassword(control: AbstractControl) {
  //   if (control.value === 'bu@1234') {
  //     return false;
  //   } else {
  //     return { passExists: true };
  //   }
  // }
  }
}
@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class RegisterComponent {
  @Input('editdata') editdata!: string;
  fb = new FormBuilder()
  form = new FormGroup({
  });
  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 200,
    'canvasHeight': 100
  };
  text!: string;

  sameaddress: any
  yourErrorName: boolean = false
  presentaddress: any;
  isVisible = false;
  isConfirmLoading = false;
  show_dd_details: boolean = false
  qualifications: any;
  change: any;
  showtick: any;
  present_add!: string;
  same_add!: string;
  response: any;
  progress!: number;
  infoMessage: any;
  isUploading: boolean = false;
  file!: File;
  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";
  uploader: any;
  url: any;
  Show: boolean = false
  percentDone!: number;
  uploadSuccess!: boolean;
  file_path: any;
  fileToUpload!: File | any;
  uploadloading: boolean = false
  aadhar: any;
  address_proof: any;
  degree_certificate: any;
  photo: any;
  signature: any;
  uploadloading2: boolean = false
  uploadloading3: boolean = false
  uploadloading4: boolean = false
  uploadloading5: boolean = false
  id: any;
  user: any = {};
  getuser: any;
  result: any;
  fetch: any;
  address: any;
  aadhar_img: any;
  deg_img: any;
  signature_img: any;
  photo_img: any;
  file_name: any;
  filetrue: boolean = false;
  isEnglish = false;
  aadhar_xml: any;
  savebtn: boolean = true;
  submitbtn: boolean = true;
  loading: boolean = false;
  submitloading:boolean = false;
  paymentlink:any;
  uploadloading6: boolean = false;
  dd_img: any;
  today: any;
  show_gateway: boolean = false;
  name_change_tri: boolean = false;
  name_change_upload: boolean = false;
  name_docs: any;
  monthname: any;
  year: any;
  receiptdata: any;
  receipturl: any;
  constructor(private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService,private currentUser: GlobalService,private activatedRoute: ActivatedRoute,private i18n: NzI18nService) {
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      dob: ['', [Validators.required]],
      aadhar_number: ['', Validators.required],
      father_or_husband_name: ['', Validators.required],
      present_address: this.fb.array([]),
      declaration: [false, Validators.required],              
      mobile_no: ['', Validators.required],
      occupation: ['', Validators.required],
      qualification: this.fb.array([]),
      same_add: [false,Validators.required],
      residential_add: this.fb.array([]),
      challan_no: [''],
      amount: [''],
      bank_name: [''],
      date: [''],
      dd_check: [],
      certificate_decl: [],
      // aadhar_decl: [],
      gender: ['', Validators.required],
      // sign_decl: [],
      // photo_decl: [],
      residential_decl: [],
      mail_id: ['', [Validators.email, Validators.required]],
      address_proof: ['',Validators.required],
      aadhar_proof: ['',Validators.required],
      deg_provitional_cerificate: ['',Validators.required],
      signature: ['',Validators.required],
      photo:['',Validators.required],
      original_add1: [''],
      original_add2: [''],
      districts: [''],
      name_of_degree: [''],
      name_of_university: [''],
      year_of_passing: [''],
      user_id:[''],
      dd_proof_or_payment_receipt:[],
      registration_number:[],
      session:[''],
      date_of_submission:[],
      name_change:[false],
      name_change_docs:[],
      communication_number:[''],
      name_change_date:[]
    });
    // if(this.fetch){
    //   this.addQuantity()
    // }
    this.addAddress()
    this.addResAddress()
    this.paymentlink = environment.api_url + '/api/payment/registration'
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;
    console.log("today",this.today)
    this.form.controls.date_of_submission.setValue(this.today)
    console.log("getmonth",mm);
    this.year = yyyy
    if(mm === '07'){
      this.monthname = 'JULY' + '' + yyyy;
      console.log(this.monthname)
      this.form.controls.session.setValue('Session  : '+ this.monthname)
    }
    if(mm === '08'){
      this.monthname = 'AUGUST' + '' + yyyy;
      this.form.controls.session.setValue('Session  : '+ this.monthname)
    }
    if(this.getuser.district){
      // this.presentaddress.get('district').disable();
      this.presentaddress.get('district').setValue(this.getuser.district);
      // this.sameaddress.get('same_district').disable();
      this.sameaddress.get('same_district').setValue(this.getuser.district);
    }
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  redirect(){
    window.open(this.paymentlink, '_blank', 'height=600,width=device-width')
  }
  getCookie(name:any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
  onKey(event: any) { // without type info
    let value = ''
   value += event.target.value;
   console.log(value)
   if(value != ''){
   this.result = myFunction(value);
   }
  }
  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
  // clickpay(){
  //   const httpOptions : any    = {
  //     headers: new HttpHeaders({
  //       //'Content-Type':  'application/json',
  //       'Access-Control-Allow-Headers': 'Content-Type,Accept,Access-Control-Allow-Origin,Autherization',
  //       'Access-Control-Allow-Methods': 'POST,GET',
  //       'Access-Control-Allow-Origin': 'https://www.tekprocess.co.in/'
  //     })
  //   };
  //   let api = `https://www.tekprocess.co.in/mobile/paynimoV2.req`;
  //      this.http.post(api,{
  //       "merchant": {
  //         "identifier": "L3348"
  //       },
  //       "payment": {
  //         "instruction": {}
  //       },
  //       "transaction": {
  //         "deviceIdentifier": "S",
  //         "type": "002",
  //         "currency": "INR",
  //         "identifier": "1516163889655",
  //         "dateTime": "17-01-2018",
  //         "subType": "002",
  //         "requestType": "TSI"
  //       },
  //       "consumer": {
  //         "identifier": "c90001008"
  //       }
  //     },httpOptions).subscribe((res: any) => {
  //          console.log("sss",res)
  //         });
  // }
  ngOnInit() {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
      this.GetReceipt() 
    this.presentaddress.get('state').setValue('Tamil Nadu')
    // this.presentaddress.get('state').disable()
    this.sameaddress.get('same_state').setValue('Tamil Nadu')
    // this.sameaddress.get('same_state').disable()
    if (this.form.controls.aadhar_number.valid) {
      this.showtick = 'success'
    }
       let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
        this.http.get(api).subscribe((res: any) => {
         console.log(res)
         if(res.data){
         this.fetch  = res.data
         this.form.controls.id.setValue(this.fetch.id)
         this.form.controls.name.setValue(this.getuser.name)
         this.form.controls.aadhar_number.setValue(this.fetch.aadhar_number)
         this.form.controls.father_or_husband_name.setValue(this.fetch.father_or_husband_name)
         this.form.controls.declaration.setValue(this.fetch.declaration)
         this.form.controls.mobile_no.setValue(this.fetch.mobile_no)
         this.form.controls.occupation.setValue(this.fetch.occupation)
         this.form.controls.challan_no.setValue(this.fetch.challan_no)
         this.form.controls.amount.setValue(this.fetch.amount)
         this.form.controls.bank_name.setValue(this.fetch.bank_name)
         this.form.controls.dob.setValue(this.fetch.dob)
         this.form.controls.date.setValue(this.fetch.date)
         this.form.controls.communication_number.setValue(this.fetch.communication_number)
         this.form.controls.name_change_date.setValue(this.fetch.name_change_date)
         this.form.controls.name_change_docs.setValue(this.fetch.name_change_docs)
         if(this.fetch.name_change === 0){
          this.form.controls.name_change.setValue('0')
          }
          if(this.fetch.name_change === 1){
           this.form.controls.name_change.setValue('1')
           }
         if(this.fetch.dd_check === 0){
         this.form.controls.dd_check.setValue('0')
         }
         if(this.fetch.dd_check === 1){
          this.form.controls.dd_check.setValue('1')
          }
          if(this.fetch.certificate_decl === 0){
            this.form.controls.certificate_decl.setValue('0')
            }
          if(this.fetch.certificate_decl === 1){
            this.form.controls.certificate_decl.setValue('1')
            }
            if(this.fetch.same_add === 0){
              this.form.controls.same_add.setValue(false)
              }
            if(this.fetch.same_add === 1){
              this.form.controls.same_add.setValue(true)
              }
         if (this.fetch.present_address.indexOf(',') > -1) 
         { 
          let obj = this.fetch.present_address.split(',');
          console.log("fext",obj)
          this.presentaddress.get('address_1').setValue(obj[0])
          this.presentaddress.get('address_2').setValue(obj[1])
          this.presentaddress.get('city').setValue(obj[2])
          this.presentaddress.get('district').setValue(this.getuser.district)
          this.presentaddress.get('state').setValue('TAMIL NADU')
          this.presentaddress.get('pincode').setValue(obj[5])
        }
        if (this.fetch.residential_add.indexOf(',') > -1) 
         { 
          let obj = this.fetch.residential_add.split(',');
          console.log("fext",obj)
          this.sameaddress.get('same_address_1').setValue(obj[0])
          this.sameaddress.get('same_address_2').setValue(obj[1])
          this.sameaddress.get('same_city').setValue(obj[2])
          this.sameaddress.get('same_district').setValue(this.getuser.district)
          this.sameaddress.get('same_state').setValue('TAMIL NADU')
          this.sameaddress.get('same_pincode').setValue(obj[5])
        }
         this.form.controls.gender.setValue(this.fetch.gender)
         if(this.form.controls.same_add.value === 1){
         this.form.controls.same_add.setValue(true)
         }
         if(this.form.controls.same_add.value === 0){
          this.form.controls.same_add.setValue(false)
          }
         this.form.controls.mail_id.setValue(this.fetch.mail_id)
         if(this.fetch.address_proof){
          this.address = environment.image_url + this.fetch.address_proof
        }
        if(this.fetch.name_change_docs){
          this.name_docs = environment.image_url + this.fetch.name_change_docs
        }
        if(this.fetch.aadhar_proof){
          this.aadhar_img = environment.image_url + this.fetch.aadhar_proof
        }
        if(this.fetch.deg_provitional_cerificate){
          this.deg_img = environment.image_url + this.fetch.deg_provitional_cerificate
        }
        if(this.fetch.signature){
          this.signature_img = environment.image_url + this.fetch.signature
        } if(this.fetch.photo){
          this.photo_img = environment.image_url + this.fetch.photo
        }  
        if(this.fetch.dd_proof_or_payment_receipt){
          this.dd_img = environment.image_url + this.fetch.dd_proof_or_payment_receipt
        }    
        this.form.controls.address_proof.setValue(this.fetch.address_proof)
        this.form.controls.aadhar_proof.setValue(this.fetch.aadhar_proof)
        this.form.controls.deg_provitional_cerificate.setValue(this.fetch.deg_provitional_cerificate)
        this.form.controls.signature.setValue(this.fetch.signature)
        this.form.controls.photo.setValue(this.fetch.photo)
        this.form.controls.dd_proof_or_payment_receipt.setValue(this.fetch.dd_proof_or_payment_receipt)
         this.form.controls.districts.setValue(this.fetch.districts)
         this.form.controls.dob.setValue(this.fetch.dob)
         this.form.controls.registration_number.setValue(this.fetch.registration_number)
         this.today = this.fetch.date_of_submission
        //  if(this.fetch.is_submit === '1'){
        //    this.savebtn = false;
        //    this.submitbtn = false;
        //    this.form.disable()
        //  
        if(res.degree_name != null){
          let i = res.degree_name.length
          for(var j=0;j<=i-1;j++){
            console.log("details",j)
            this.addQuantity()
            this.qualifications.get('degree_name').setValue(res.degree_name[j]);
            this.qualifications.get('university_name').setValue(res.university[j]);
            this.qualifications.get('year_passing').setValue(res.year_of_passing[j]);
          }
        }
      } 
      if(res.degree_name === null || !res.degree_name){
        this.addQuantity()
      } 
        });
  }
  GetReceipt() {
    let api = `${environment.api_url}/api/checkpaymentregister/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
     this.receiptdata = res.data
     
    });
  }
  receipt(){
    if(this.receiptdata){
      this.receipturl = `${environment.api_url}/api/downloadreceipt/${this.getuser.id}`;
      window.open(this.receipturl)
    }
  }
  Fetch(){
    let params = new HttpParams();
    params = params.append('file_name', this.file_name);
    params = params.append('user_id', this.getuser.id);
    params = params.append('aadhar', this.form.controls.aadhar_number.value);
      let api = `${environment.api_url}/api/extract`;
      this.http.get(api,{params:params}).subscribe((res: any) => {
        this.response = res.data
        this.form.controls.name.setValue(this.getuser.name) 
         this.form.controls.aadhar_number.setValue(this.response.aadhar_no)
        //  this.form.controls.dob.setValue(this.response.dob)
        this.form.controls.id.setValue(this.fetch.id)
         this.form.controls.father_or_husband_name.setValue(this.response.careof) 
          this.sameaddress.get('same_address_1').setValue(this.response.house)
          this.sameaddress.get('same_address_2').setValue(this.response.street)
          this.sameaddress.get('same_city').setValue(this.response.city)
          // this.sameaddress.get('same_district').setValue(this.response.dist)
          this.sameaddress.get('same_state').setValue(this.response.state)
          this.sameaddress.get('same_pincode').setValue(this.response.pc)
          if(this.response.gender === 'F'){
            this.form.controls.gender.setValue('female')
          }
         else{
            this.form.controls.gender.setValue('male')
          }
        console.log("response", this.response)
        if(res.validate){
          let type: string = 'success'
          this.notification.create(
            type,
            'Success!!',
            'Data Fetched Successfully!')
          }
          if(res.failed){
            let type: string = 'error'
            this.notification.create(
              type,
              'Failed!!',
              'Please Attach Xml Aadhar File!')
            }
      });
  }
  // Trigger(){
  //   this.result = myFunction(this.form.controls.aadhar_number.value);
  //   console.log('popup',this.result)
  // }
  Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  Receipt(){
    this.router.navigate(['/receipt']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
  triggername(e: any) {
    console.log(e)
    if (e === '1') {
      this.name_change_tri = true
    }
    else {
      this.name_change_tri = false
    }
  }
  triggerdetails(e: any) {
    console.log(e)
    if (e === '1') {
      this.show_dd_details = true
    }
    else {
      this.show_dd_details = false
    }
  }
  // triggerdetails1(e: any) {
  //   console.log(e)
  //   if (e === '1') {
  //     this.show_dd_details = false
  //     this.show_gateway = true
  //   }
  //   if (e === '0') {
  //     this.show_dd_details = true
  //     this.show_gateway = false
  //   }
  // }
  namechange1(files: FileList) {
    this.name_change_upload = true;
    this.fileToUpload = files.item(0);
    let dd_image = new FormData();
    dd_image.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/upload', dd_image).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.name_docs = environment.image_url + res.file_name
        this.form.controls.name_change_docs.setValue(res.file_name)
        this.name_change_upload = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Success!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  cancel(): void {
    this.msg.info('click cancel');
  }

  qualification(): FormArray {
    return this.form.get("qualification") as FormArray
  }
  presentAddress(): FormArray {
    return this.form.get("present_address") as FormArray
  }
  ResAddress(): FormArray {
    return this.form.get("residential_add") as FormArray
  }
  addResAddress() {
    this.ResAddress().push(this.newResAddress());
  }
  addAddress() {
    this.presentAddress().push(this.newAddress());
  }

  aadharpost(files: FileList) {
    // this.uploadloading_a = true;
    this.fileToUpload = files.item(0);
    let aadhar_xml = new FormData();
    aadhar_xml.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/aadharupload', aadhar_xml).subscribe((res: any) => {
      console.log(res);
      if(res){
      this.file_name = res.file_name
      this.filetrue = true
      }
      if (res.data) {
        this.aadhar_xml = res.data
        this.uploadloading = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Success!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod6(files: FileList) {
    this.uploadloading6 = true;
    this.fileToUpload = files.item(0);
    let dd_image = new FormData();
    dd_image.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/upload', dd_image).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.dd_img = environment.image_url + res.file_name
        this.form.controls.dd_proof_or_payment_receipt.setValue(res.file_name)
        this.uploadloading6 = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Success!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod1(files: FileList) {
    this.uploadloading = true;
    this.fileToUpload = files.item(0);
    let aadhar = new FormData();
    aadhar.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/upload', aadhar).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.aadhar_img = environment.image_url + res.file_name
        console.log('aadhra',this.aadhar_img)
        this.form.controls.aadhar_proof.setValue(res.file_name)
        this.uploadloading = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Success!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod2(files: FileList) {
    this.uploadloading2 = true;
    this.fileToUpload = files.item(0);
    let address_proof = new FormData();
    address_proof.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post(environment.api_url+'/api/upload', address_proof).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.uploadloading2 = false;
        this.address = environment.image_url + res.file_name
        this.form.controls.address_proof.setValue(res.file_name)
        this.uploadloading2 = false;
        let type: string = 'success'
        this.notification.create(
          type,
          'Sucess!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod3(files: FileList) {
    this.uploadloading3 = true;
    this.fileToUpload = files.item(0);
    let degree_certificate = new FormData();
    degree_certificate.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post(environment.api_url+'/api/upload', degree_certificate).subscribe((res: any) => {
      console.log(res);
      if (!res.data) {
        this.uploadloading3 = true;
      }
      if (res.data) {
        this.deg_img = environment.image_url + res.file_name
        this.form.controls.deg_provitional_cerificate.setValue(res.file_name)
        this.uploadloading3 = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Sucess!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod4(files: FileList) {
    this.uploadloading4 = true;
    this.fileToUpload = files.item(0);
    let photo = new FormData();
    photo.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post(environment.api_url+'/api/upload', photo).subscribe((res: any) => {
      console.log(res);
      if (!res.data) {
        this.uploadloading4 = true;
      }
      if (res.data) {
        this.photo_img = environment.image_url + res.file_name
        this.form.controls.photo.setValue(res.file_name)
        this.uploadloading4 = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Sucess!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  postMethod5(files: FileList) {
    this.uploadloading5 = true;
    this.fileToUpload = files.item(0);
    let signature = new FormData();
    signature.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post(environment.api_url+'/api/upload', signature).subscribe((res: any) => {
      console.log(res);
      if (!res.data) {
        this.uploadloading5 = true;
      }
      if (res.data) {
        this.signature_img = environment.image_url + res.file_name
        this.form.controls.signature.setValue(res.file_name)
        this.uploadloading5 = false;
        let type: string = 'success'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Sucess!!',
          'File uploaded Successfully!')
      }
      else{
        this.notification.create(
          'error',
          'Failed!!',
          res.errors.file)
      }
    });
    return false;
  }
  newQuantity(): FormGroup {
    this.qualifications = this.fb.group({
      degree_name: '',
      university_name: '',
      year_passing: ''
    })
    return this.qualifications
  }
  newAddress(): FormGroup {
    this.presentaddress = this.fb.group({
      address_1: ['', Validators.required],
      address_2: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    })
    return this.presentaddress
  }
  newResAddress(): FormGroup {
    this.sameaddress = this.fb.group({
      same_address_1: ['', Validators.required],
      same_address_2: ['', Validators.required],
      same_city: ['', Validators.required],
      same_district: ['', Validators.required],
      same_state: ['', Validators.required],
      same_pincode: ['', Validators.required],
    })
    return this.sameaddress
  }
  addQuantity() {
    this.qualification().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.qualification().removeAt(i);
  }
  ngOnChanges() {
    console.log(this.form.controls.same_add.value)
    this.form.controls.sam
  }

  trigger(e: any) {
    console.log(e)
    if (e === true) {
      this.presentaddress.get('address_1').setValue(this.sameaddress.get('same_address_1').value)
      this.presentaddress.get('address_2').setValue(this.sameaddress.get('same_address_2').value)
      this.presentaddress.get('city').setValue(this.sameaddress.get('same_city').value)
      this.presentaddress.get('district').setValue(this.sameaddress.get('same_district').value)
      this.presentaddress.get('state').setValue(this.sameaddress.get('same_state').value)
      this.presentaddress.get('pincode').setValue(this.sameaddress.get('same_pincode').value)
    }
    else {
      this.presentaddress.get('address_1').setValue(null)
      this.presentaddress.get('address_2').setValue(null)
      this.presentaddress.get('city').setValue(null)
      this.presentaddress.get('district').setValue(null)
      this.presentaddress.get('state').setValue(null)
      this.presentaddress.get('pincode').setValue(null)
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: false,
  };
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.form.enable()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.form.enable()
  }

  uploadAndProgress(files: File[]) {
    console.log("myfilw", files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))

    this.http.post(environment.api_url+'/api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
        if (event.data) {
          this.file_path = event.data
          console.log("mypath", event)
        }
      });
  }
  click(type: any) {
    this.notification.create(
      type,
      'Error!!',
      'welocme'
    );
  }
  Dectrigger(e: any) {
    console.log(e)
    this.change = e
    if (this.change) {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
      for (const i in this.presentaddress.controls) {
        this.presentaddress.controls[i].markAsDirty();
        this.presentaddress.controls[i].updateValueAndValidity();
      }
      for (const i in this.sameaddress.controls) {
        this.sameaddress.controls[i].markAsDirty();
        this.sameaddress.controls[i].updateValueAndValidity();
      }
    }
  }

  //save the data

  async save(){
    if(this.result === 'failed'){
      window.alert('Incorrect Aadhar Number!')
     return 
    }
    this.loading = true;
    this.form.controls.districts.setValue(this.sameaddress.get('same_district').value)
    this.form.controls.user_id.setValue(this.getuser.id)
    this.form.controls.mail_id.setValue(this.getuser.email)
    this.form.controls.mobile_no.setValue(this.getuser.mobile_no)
    console.log(this.presentaddress.controls)
    if (this.presentaddress.controls) {
      this.present_add = this.presentaddress.controls.address_1.value + ',' + this.presentaddress.controls.address_2.value + ',' + this.presentaddress.controls.city.value + ',' + this.presentaddress.controls.district.value + ',' + this.presentaddress.controls.state.value + ',' + this.presentaddress.controls.pincode.value;
      // dd.original_add1 = this.present_add
    }
    if (this.sameaddress.controls) {
      this.same_add = this.sameaddress.controls.same_address_1.value + ',' + this.sameaddress.controls.same_address_2.value + ',' + this.sameaddress.controls.same_city.value + ',' + this.sameaddress.controls.same_district.value + ',' + this.sameaddress.controls.same_state.value + ',' + this.sameaddress.controls.same_pincode.value;
      // dd.original_add2 = this.same_add
    }
    var result = []
    result = this.form.controls.present_address.value
    const json = this.form.controls.present_address.value
    let data = JSON.stringify(json);
    const obj = JSON.parse(data);
    console.log(obj)
    let temp: any = {}
    let degree: any = []
    let university_name: any = []
    let year_passing: any = []
    this.form.controls.qualification.value.forEach((element:any) => {
      degree.push(element.degree_name)
      university_name.push(element.university_name)
      year_passing.push(element.year_passing)
      this.form.controls.name_of_degree.setValue(degree)
      this.form.controls.name_of_university.setValue(university_name)
      this.form.controls.year_of_passing.setValue(year_passing)
      console.log("ele",degree)
    });
    let dd = this.result
    let url = `${environment.api_url}/api/save`;
    this.http.post(url, this.form.value,dd).subscribe((res: any) => {
      this.response = res
      this.loading = false;
      if(res.data){
        let type: string = 'success';
       let message = 'Data saved Successfully';
       this.notification.create(
         type,
         'Success!!',
         message)
       }
      console.log("response", this.response)
      if(res.university){
        this.form.controls.name_of_degree.setValue(res.university)
        
      }
      if(res.year_of_passing){
        this.form.controls.year_of_passing.setValue(res.year_of_passing)
      }
       
      if (this.response.data) {
        this.fetch  = res.data
        //  this.form.controls.name.setValue(this.fetch.name)
        this.form.controls.id.setValue(this.fetch.id)
         this.form.controls.aadhar_number.setValue(this.fetch.aadhar_number)
         this.form.controls.father_or_husband_name.setValue(this.fetch.father_or_husband_name)
         this.form.controls.declaration.setValue(this.fetch.declaration)
         this.form.controls.mobile_no.setValue(this.fetch.mobile_no)
         this.form.controls.occupation.setValue(this.fetch.occupation)
         this.form.controls.dd_proof_or_payment_receipt.setValue(this.fetch.dd_proof_or_payment_receipt)
         this.form.controls.challan_no.setValue(this.fetch.challan_no)
         this.form.controls.amount.setValue(this.fetch.amount)
         this.form.controls.bank_name.setValue(this.fetch.bank_name)
         this.form.controls.dob.setValue(this.fetch.dob)
         this.form.controls.communication_number.setValue(this.fetch.communication_number)
         this.form.controls.name_change_date.setValue(this.fetch.name_change_date)
         this.form.controls.name_change_docs.setValue(this.fetch.name_change_docs)
         this.form.controls.date.setValue(this.fetch.date)
         if(this.fetch.dd_check === 0){
         this.form.controls.dd_check.setValue('0')
         }
         if(this.fetch.dd_check === 1){
          this.form.controls.dd_check.setValue('1')
          }
          if( this.fetch.name_change === 0){
            this.form.controls.name_change.setValue('0')
          }
          if( this.fetch.name_change === 1){
            this.form.controls.name_change.setValue('1')
          }
          if(this.fetch.certificate_decl === 0){
            this.form.controls.certificate_decl.setValue('0')
            }
          if(this.fetch.certificate_decl === 1){
            this.form.controls.certificate_decl.setValue('1')
            }
         if (this.fetch.present_address.indexOf(',') > -1) 
         { 
          let obj = this.fetch.present_address.split(',');
          console.log("fext",obj)
          this.presentaddress.get('address_1').setValue(obj[0])
          this.presentaddress.get('address_2').setValue(obj[1])
          this.presentaddress.get('city').setValue(obj[2])
          this.presentaddress.get('district').setValue(this.getuser.district);
          this.presentaddress.get('state').setValue('TAMIL NADU')
          this.presentaddress.get('pincode').setValue(obj[5])
        }
        if (this.fetch.residential_add.indexOf(',') > -1) 
         { 
          let obj = this.fetch.residential_add.split(',');
          console.log("fext",obj)
          this.sameaddress.get('same_address_1').setValue(obj[0])
          this.sameaddress.get('same_address_2').setValue(obj[1])
          this.sameaddress.get('same_city').setValue(obj[2])
          this.sameaddress.get('same_district').setValue(this.getuser.district);
          this.sameaddress.get('same_state').setValue("TAMIL NADU")
          this.sameaddress.get('same_pincode').setValue(obj[5])
        }
         this.form.controls.gender.setValue(this.fetch.gender)
         if(this.form.controls.same_add.value === 1){
         this.form.controls.same_add.setValue(true)
         }
         if(this.form.controls.same_add.value === 0){
          this.form.controls.same_add.setValue(false)
          }
         this.form.controls.mail_id.setValue(this.fetch.mail_id)
         if(this.fetch.address_proof){
          this.address = environment.image_url + this.fetch.address_proof
        }
        if(this.fetch.aadhar_proof){
          this.aadhar_img = environment.image_url + this.fetch.aadhar_proof
        }
        if(this.fetch.deg_provitional_cerificate){
          this.deg_img = environment.image_url + this.fetch.deg_provitional_cerificate
        }
        if(this.fetch.signature){
          this.signature_img = environment.image_url + this.fetch.signature
        } if(this.fetch.photo){
          this.photo_img = environment.image_url + this.fetch.photo
        }   
        if(this.fetch.dd_proof_or_payment_receipt){
          this.dd_img = environment.image_url + this.fetch.dd_proof_or_payment_receipt
        }     
        this.form.controls.address_proof.setValue(this.fetch.address_proof)
        this.form.controls.aadhar_proof.setValue(this.fetch.aadhar_proof)
        this.form.controls.deg_provitional_cerificate.setValue(this.fetch.deg_provitional_cerificate)
        this.form.controls.signature.setValue(this.fetch.signature)
        this.form.controls.photo.setValue(this.fetch.photo)
         this.form.controls.districts.setValue(this.fetch.districts)
         this.form.controls.registration_number.setValue(this.fetch.registration_number)
         this.form.controls.dob.setValue(this.fetch.dob)
         this.today = this.fetch.date_of_submission
        //  if(this.fetch.is_submit === '1'){
        //    this.savebtn = false;
        //    this.submitbtn = false;
        //    this.form.disable()
        //  
        if(res.degree_name != null && res.degree_name.length){
          let i = res.degree_name.length
          for(var j=0;j<=i-1;j++){
            console.log("details",j)
            this.addQuantity()
            this.qualifications.get('degree_name').setValue(res.degree_name[j]);
            this.qualifications.get('university_name').setValue(res.university[j]);
            this.qualifications.get('year_passing').setValue(res.year_of_passing[j]);
          }
        }
      } 
      // if(res.degree_name === null || !res.degree_name){
      //   this.addQuantity()
      // } 
      if (res.errors) {
        let errormessage = ''
        if (res.errors.aadhar_number) {
          errormessage = res.errors.aadhar_number
        }
        if (res.errors.mobile_no) {
          errormessage = res.errors.mobile_no
        }
        if (res.errors.mail_id) {
          errormessage = res.errors.mail_id
        }
        if (res.errors.communication_number) {
          errormessage = res.errors.communication_number
        }
        if (res.errors.year_of_passing) {
          errormessage = res.errors.year_of_passing
        }
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          errormessage)
      }
    });
  }

  //submit the data

  async submitform() {
    if(this.result === 'failed'){
      window.alert('Incorrect Aadhar Number!')
     return 
    }
    this.submitloading = true
    if (!this.form.controls.declaration.value) {
      window.alert('Please check Agree the self declaration')
      this.submitloading = false
      return
    }
    // if(!this.receiptdata){
    //   window.alert('Please pay registration fee, before submitting!')
    //   this.submitloading = false
    //   return
    // }
    let dd:any;
    if(this.fetch){
    this.form.controls.id.setValue(this.fetch.id)
    }
      this.form.controls.districts.setValue(this.sameaddress.get('same_district').value)
      console.log(this.presentaddress.controls)
      if (this.presentaddress.controls) {
        this.present_add = this.presentaddress.controls.address_1.value + ',' + this.presentaddress.controls.address_2.value + ',' + this.presentaddress.controls.city.value + ',' + this.presentaddress.controls.district.value + ',' + this.presentaddress.controls.state.value + ',' + this.presentaddress.controls.pincode.value;
        // dd.original_add1 = this.present_add
      }
      if (this.sameaddress.controls) {
        this.same_add = this.sameaddress.controls.same_address_1.value + ',' + this.sameaddress.controls.same_address_2.value + ',' + this.sameaddress.controls.same_city.value + ',' + this.sameaddress.controls.same_district.value + ',' + this.sameaddress.controls.same_state.value + ',' + this.sameaddress.controls.same_pincode.value;
        // dd.original_add2 = this.same_add
      }
      var result = []
      result = this.form.controls.present_address.value
      const json = this.form.controls.present_address.value
      let data = JSON.stringify(json);
      const obj = JSON.parse(data);
      console.log(obj)
      let temp: any = {}
      let degree: any = []
      let university_name: any = []
      let year_passing: any = []
      this.form.controls.qualification.value.forEach((element:any) => {
        degree.push(element.degree_name)
        university_name.push(element.university_name)
        year_passing.push(element.year_passing)
        this.form.controls.name_of_degree.setValue(degree)
        this.form.controls.name_of_university.setValue(university_name)
        this.form.controls.year_of_passing.setValue(year_passing)
        console.log("ele",degree)
      });
      dd = this.result
      this.form.controls.name.setValue(this.getuser.name)
      this.form.controls.user_id.setValue(this.getuser.id)
      this.form.controls.mail_id.setValue(this.getuser.email)
      this.form.controls.user_id.setValue(this.getuser.id)
      // this.form.controls.id.setValue(this.fetch.id)
      this.form.controls.mobile_no.setValue(this.getuser.mobile_no)
    let url = `${environment.api_url}/api/store`;
    this.http.post(url, this.form.value,dd).subscribe((res: any) => {
      this.response = res
      this.submitloading = false
      console.log("response", this.response)
      if (this.response.data) {
        // console.log("welcome")
        let type: string = 'success'
        this.notification.create(
          type,
          'Error!!',
          'Application Submitted Successfully!!')
        this.router.navigate(['/downloadpdf/'])
        this.id = this.response.data.id
      }
      if(res.payment_pending){
        let errormessage = ''
          errormessage = res.payment_pending
          let type: string = 'error'
          console.log('oops', res.errors)
          this.notification.create(
            type,
            'Error!!',
            errormessage)
      }
      if (res.errors) {
        let errormessage = ''
        if (res.errors.aadhar_number) {
          errormessage = res.errors.aadhar_number
        }
        if (res.errors.mobile_no) {
          errormessage = res.errors.mobile_no
        }
        if (res.errors.mail_id) {
          errormessage = res.errors.mail_id
        }
        if (res.errors.aadhar_proof) {
          errormessage = res.errors.aadhar_proof
        }
        if (res.errors.address_proof) {
          errormessage = res.errors.address_proof
        }
        if (res.errors.deg_provitional_cerificate) {
          errormessage = res.errors.deg_provitional_cerificate
        }
        if (res.errors.photo) {
          errormessage = res.errors.photo
        }
        if (res.errors.dob) {
          errormessage = res.errors.dob
        }
        if (res.errors.signature) {
          errormessage = res.errors.signature
        }
        if (res.errors.year_of_passing) {
          errormessage = res.errors.year_of_passing
        }
        if (res.errors.dd_proof_or_payment_receipt) {
          errormessage = res.errors.dd_proof_or_payment_receipt
        }
        if (res.errors.gender) {
          errormessage = res.errors.gender
        }
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          errormessage)
      }
    });
  }
}
declare var jsPDF: any;
@Component({
  selector: 'app-download',
  templateUrl: './downloadpdf.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class DownloadComponent {
  id: any;
  html: any
  show: any
  url: any;
  getuser:any = {};
  photo:any;
  sign:any;
  degree:any;
  add_proof:any;
  aadhar_proof:any;
  dd_image:any;
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  user: any;
  name_change_proof: any;
  receiptdata: any;
  receipturl: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private router: Router) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
  }
  ngOnInit() {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
    let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
      this.url = res.data
      this.photo = environment.image_url + this.url.photo
      this.sign = environment.image_url + this.url.signature
      this.degree = environment.image_url + this.url.deg_provitional_cerificate
      this.add_proof = environment.image_url + this.url.address_proof
      this.aadhar_proof = environment.image_url + this.url.aadhar_proof
      this.dd_image = environment.image_url + this.url.dd_proof_or_payment_receipt
      this.name_change_proof = environment.image_url + this.url.name_change_docs
      console.log("repsosn",this.url)
    });
    this.GetReceipt()
  }
  GetReceipt() {
    let api = `${environment.api_url}/api/checkpaymentregister/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
     this.receiptdata = res.data
     
    });
  }
  receipt(){
    if(this.receiptdata){
      this.receipturl = `${environment.api_url}/api/downloadreceipt/${this.getuser.id}`;
      window.open(this.receipturl)
    }
    
  }
    Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
  
  public downloadAsPDF() {
       let api = `${environment.api_url}/api/downloadPDF/${this.getuser.id}`;
       window.open(api)
  }
}

@Component({
  selector: 'app-rejectedstudent',
  templateUrl: './rejectedstudent.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class RelectedStudentDetailsComponent {
  rejected: any;
  select: any;
  loading: boolean = false
  searchValue = '';
  visible = false;
  listOfDisplayData: any;
  name: any
  district: any
  applicationNumber: any
  remark = new FormControl('');
  user:any;
  getuser: any;
  constructor(private httpClient: HttpClient,private notification: NzNotificationService) { }
  ngOnInit() {
    
    this.getrejected()
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  getaadhar(aadhar:any){
    let str ='';
    str = environment.image_url+aadhar
   return str
   }
  getrejected() {
    this.remark.reset()
    this.loading = true
    let api = `${environment.api_url}/api/rejected`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.rejected = res.data;
        this.loading = false
   });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  refresh(){
    this.getrejected() 
  }
  Switch(event:any,data:any){
    console.log(data,event)
    let url = `${environment.api_url}/api/accepted`;
    this.httpClient.post(url, {remark_status:event,remarks:this.remark.value,id:data,remark_person:this.getuser.id}).subscribe((res: any) => {
      if (res.success) {
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          'This Application was Accepted!!')
      }
      if(res){
        this.getrejected()
      }
      if (res.failed) {
        let type: string = 'error'
        this.notification.create(
          type,
          'Failed!!',
          'Sorry something went wrong!')
      }
    });
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.select.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
}
interface DataItem {
  name: string;
  aadhar_number: string;
  father_or_husband_name: string;
  mobile_no: number;
  degree_name: string;
  university: string;
  year_of_passing: number;
  occupation: string;
  application_no: number;
  present_address: string;
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class StudentDetailsComponent {
  select: any;
  loading: boolean = false
  searchValue = '';
  searchText: any
  visible = false;
  listOfDisplayData: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  isCollapsed=false
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};
  public chartOptions1: Partial<ChartOptions> = {};
  public pieChartLabels: any = [];
  public pieChartData: any = [];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['#fc5858', '#19d863', '#fdf57d', '#aa11d0'],
  }];
  public pieChartType = 'pie';
  public pieChartLabels1: any = [];
  public pieChartData1: any = [];
  public pieChartColors1: Array<any> = [{
    backgroundColor: ['#aa11d0', '#4512a8', '#a81265'],
  }];
  public pieChartType1 = 'pie';
  type = 'pie';
  chart1: any;
  name: any
  district: any
  applicationNumber: any
  user: any;
  getuser: any;
  remark = new FormControl('');
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private notification: NzNotificationService) {
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  
  getaadhar(aadhar:any){
   let str ='';
   str = environment.image_url+aadhar
  return str
  }
  public downloadAsPDF(id:any) {
    let api = `${environment.api_url}/api/downloadnewIndividual/${id}`;
    window.open(api)
}
refresh(){
  this.getSelected() 
  this.GetChart() 
  this.GetChart1() 
}
  Switch(event:any,data:any){
    console.log(this.remark.value);
    let url = `${environment.api_url}/api/remarks`;
    this.http.post(url, {remark_status:event,remarks:this.remark.value,id:data,remark_person:this.getuser.id}).subscribe((res: any) => {
      if (res.success) {
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          'This Application was Rejected!!')
      }
      if(res){
        this.getSelected()
        this.GetChart()
        this.GetChart1()
      }
      if (res.failed) {
        let type: string = 'error'
        this.notification.create(
          type,
          'Failed!!',
          'Sorry something went wrong!')
      }
    });
  }
  getSelected() {
    this.remark.reset()
    this.loading = true
    let api = `${environment.api_url}/api/selected`;
    this.http.get(api).subscribe((res: any) => {
      this.select = res.data;
      console.log("selected",this.select)
        this.loading = false
    });
  }
  Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
 
  GetChart() {
    let api = `${environment.api_url}/api/piechart`;
    this.http.get(api).subscribe((res: any) => {
      this.chart1 = res
      let coimbatore = res.coimbatore
      let erode = res.erode
      let nilgiris = res.nilgiris
      let tirpur = res.tirpur
      let coimbatore_count = 'Coimbatore - ' + res.coimbatore
      let erode_count = 'Erode - ' + res.erode
      let nilgiris_count = 'The Nilgiris - ' + res.nilgiris
      let tirpur_count = 'Tirpur - ' + res.tirpur
      this.pieChartLabels.push(coimbatore_count, erode_count, nilgiris_count, tirpur_count)
      this.pieChartData.push(coimbatore, erode, nilgiris, tirpur)
      console.log(this.pieChartData)
      this.chartOptions = {
        series: [coimbatore, erode, nilgiris, tirpur],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: [coimbatore_count, erode_count, nilgiris_count, tirpur_count],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }
  GetChart1() {
    let api = `${environment.api_url}/api/piechart1`;
    this.http.get(api).subscribe((res: any) => {
      let selected = res.selected
      let rejected = res.rejected
      let total = res.total
      let selected_count = 'Selected List - ' + res.selected
      let rejected_count = 'Rejected List - ' + res.rejected
      let total_count = 'Total - ' + res.total
      this.pieChartLabels1.push(total_count, selected_count, rejected_count)
      this.pieChartData1.push(total, selected, rejected)
      this.chartOptions1 = {
        series: [selected, rejected],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: [selected_count, rejected_count],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }
  downloadbulk() {
    let api = `${environment.api_url}/api/bulkdownload`;
    window.open(api)
    // this.httpClient.get(api).subscribe((res: any) => {
    //   console.log(res)
    // });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.select.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
  ngOnInit() {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
    this.getSelected()
    this.GetChart()
    this.GetChart1()
  }
}

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class NewUserComponent {
  validateForm: FormGroup;
  response: any;
  id: any;
  regloading:boolean = false;
  otploading: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      district: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      otp:['',[Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
  Getotp() {
    this.otploading = true
      let url = `${environment.api_url}/api/reg_otp`;
        this.http.post(url,{email:this.validateForm.controls.email.value}).subscribe((res: any) => {
          if(res){
            this.otploading = false
                if (res.data) {
                  let type: string = 'success'
                  this.notification.create(
                    type,
                    'Success!!',
                    'OTP is Sent to Your Email!')
                  }
               if (res.failed) {
                let type: string = 'error'
                this.notification.create(
                  type,
                  'Failed!!',
                  'Invalid OTP Please Enter Correct OTP!')
                }
                if (res.errors.email) {
                  let errormessage = res.errors.email
                  let type: string = 'error'
                this.notification.create(
                  type,
                  'Error!!',
                  errormessage)
                }
                }
              });
    }
  submitForm() {
    this.regloading = true;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(this.validateForm.value)
    let url = `${environment.api_url}/api/storeuser`;
    this.http.post(url, this.validateForm.value).subscribe((res: any) => {
      this.response = res
      this.regloading = false
      console.log("response", this.response)
      if (this.response.data) {
        this.id = this.response
        this.router.navigate([''])
      }
      if(res.success){
        let type: string = 'success'
        this.notification.create(
          type,
          'Success!!',
          'Registration Completed Successfully!!')
      }
      if (res.errors) {
        let errormessage = ''
        if (res.errors.mobile_no) {
          errormessage = res.errors.mobile_no
        }
        if (res.errors.email) {
          errormessage = res.errors.email
        }
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          errormessage)
      }
      if (res.failed) {
        let type: string = 'error'
        this.notification.create(
          type,
          'Failed!!',
          'Invalid OTP!')
      }
    });
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}

@Component({
  selector: 'app-viewpdf',
  templateUrl: './viewpdf.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class ViewPDfComponent {
  url: any;
  getuser:any = {};
  photo:any;
  sign:any;
  degree:any;
  add_proof:any;
  aadhar_proof:any;
  id!: string | null;
  user: any;
  dd_image: any;
  name_change_proof: any;
  receiptdata: any;
  receipturl: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private router: Router) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  ngOnInit() {
    this.GetReceipt()
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
      this.url = res.data
      this.photo = environment.image_url + this.url.photo
      this.sign = environment.image_url + this.url.signature
      this.degree = environment.image_url + this.url.deg_provitional_cerificate
      this.add_proof = environment.image_url + this.url.address_proof
      this.aadhar_proof = environment.image_url + this.url.aadhar_proof
      this.dd_image = environment.image_url + this.url.dd_proof_or_payment_receipt
      this.name_change_proof = environment.image_url + this.url.name_change_docs
      console.log("repsosn",this.url)
    });
  }
  GetReceipt() {
    let api = `${environment.api_url}/api/checkpaymentregister/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
     this.receiptdata = res.data
     
    });
  }
  receipt(){
    if(this.receiptdata){
      this.receipturl = `${environment.api_url}/api/downloadreceipt/${this.getuser.id}`;
      window.open(this.receipturl)
    }
    
  }
  Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
 
}

function getISOWeek(result: Date): any {
  throw new Error('Function not implemented.');
}

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class ResetPwDComponent {
  user:any;
  getuser:any = {};
  resetform = new FormGroup({})
  response: any;
  resetloading:boolean = false
  otploading:boolean= false
  constructor(private fb: FormBuilder,private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private router: Router,private notification: NzNotificationService) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    this.resetform = this.fb.group({
      reset_pwd: ['', [Validators.required]],
      otp: [''],
      email: ['', [Validators.required,Validators.email]],
    });
  }
  Getotp() {
    this.otploading = true
      let url = `${environment.api_url}/api/verifiy`;
        this.http.post(url,{email:this.resetform.controls.email.value}).subscribe((res: any) => {
          if(res){
            this.otploading = false
                if (res.data) {
                  let type: string = 'success'
                  this.notification.create(
                    type,
                    'Success!!',
                    'OTP is Sent to Your Email!')
                  }
               if (res.failed) {
                let type: string = 'error'
                this.notification.create(
                  type,
                  'Failed!!',
                  'Invalid OTP Please Enter Correct OTP!')
                }
                if (res.error) { 
                  let type: string = 'error'
                  this.notification.create(
                    type,
                    'Failed!!',
                    res.error)
                  }
                }
              });
    }
    async submitForm() {
      this.resetloading = true
      for (const i in this.resetform.controls) {
        this.resetform.controls[i].markAsDirty();
        this.resetform.controls[i].updateValueAndValidity();
        this.resetloading = false
      }
      if(this.resetform.invalid){
        this.resetloading = false
      }
      let url = `${environment.api_url}/api/resetpwd`;
      this.http.post(url, this.resetform.value).subscribe((res: any) => {
        this.response = res
        if(res.data){
        this.resetloading = false
        console.log("response", this.response)
        if (this.response.success) {
          let type: string = 'success'
          this.notification.create(
            type,
            'Success!!',
            'PassWord Changed Successfully!')
          }
       this.router.navigate([''])
        }
        else{
          let type: string = 'error'
          this.notification.create(
            type,
            'Failed!!',
            'Invalid OTP Please Enter Correct OTP!')
          }
      });
    }
}


interface DataItem {
  name: string;
  aadhar_number: string;
  father_or_husband_name: string;
  mobile_no: number;
  degree_name: string;
  university: string;
  year_of_passing: number;
  occupation: string;
  application_no: number;
  present_address: string;
}
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-studentrenewal',
  templateUrl: './studentrenewal.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class RenewalDetailsComponent {
  select: any;
  loading: boolean = false
  searchValue = '';
  searchText: any
  visible = false;
  listOfDisplayData: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions1> = {};
  public chartOptions1: Partial<ChartOptions1> = {};
  public pieChartLabels: any = [];
  public pieChartData: any = [];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['#fc5858', '#19d863', '#fdf57d', '#aa11d0'],
  }];
  public pieChartType = 'pie';
  public pieChartLabels1: any = [];
  public pieChartData1: any = [];
  public pieChartColors1: Array<any> = [{
    backgroundColor: ['#aa11d0', '#4512a8', '#a81265'],
  }];
  public pieChartType1 = 'pie';
  type = 'pie';
  chart1: any;
  name: any
  district: any
  applicationNumber: any
  user: any;
  getuser: any;
  remark = new FormControl('');
  constructor(private httpClient: HttpClient, private router: Router, private notification: NzNotificationService) {
    this.user = sessionStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  
  getaadhar(aadhar:any){
   let str ='';
   str = environment.image_url+aadhar
  return str
  }
  public downloadAsPDF(id:any) {
    let api = `${environment.api_url}/api/downloadrenewIndividual/${id}`;
    window.open(api)
}
refresh(){
  this.getSelected() 
  this.GetChart() 
  this.GetChart1() 
}
Switch(event:any,data:any){
  console.log(data,event)
  let url = `${environment.api_url}/api/remarkrenewal`;
  this.httpClient.post(url, {remark_status:event,remarks:this.remark.value,id:data,remark_person:this.getuser.id}).subscribe((res: any) => {
    if (res.success) {
      let type: string = 'error'
      console.log('oops', res.errors)
      this.notification.create(
        type,
        'Error!!',
        'This Application was Rejected!!')
    }
    if(res){
      this.getSelected() 
      this.GetChart() 
      this.GetChart1() 
    }
    if (res.failed) {
      let type: string = 'error'
      this.notification.create(
        type,
        'Failed!!',
        'Sorry something went wrong!')
    }
  });
}
  getSelected() {
    this.remark.reset()
    this.loading = true
    let api = `${environment.api_url}/api/renewselected`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.select = res.data;
      console.log("selected",this.select)
        this.loading = false
    });
  }
  Regsiter(){
    this.router.navigate(['/registration']);
  }
  viewDetails(){
    this.router.navigate(['/viewdetails']);
  }
  download(){
    this.router.navigate(['/downloadpdf']);
  }
  Instruction(){
    this.router.navigate(['/home']);
  }
  StdDetails(){
    this.router.navigate(['/studentdetails']);
  }
  StdRewnewalDetails(){
    this.router.navigate(['/studentrenewaldetails']);
  }
  delete_cookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
    this.delete_cookie("user_id",null,null);
    this.delete_cookie("email",null,null);
    this.delete_cookie("mobile_no",null,null);
  }
  GetChart() {
    let api = `${environment.api_url}/api/renewpiechart`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.chart1 = res
      let coimbatore = res.coimbatore
      let erode = res.erode
      let nilgiris = res.nilgiris
      let tirpur = res.tirpur
      let coimbatore_count = 'Coimbatore - ' + res.coimbatore
      let erode_count = 'Erode - ' + res.erode
      let nilgiris_count = 'The Nilgiris - ' + res.nilgiris
      let tirpur_count = 'Tirpur - ' + res.tirpur
      this.pieChartLabels.push(coimbatore_count, erode_count, nilgiris_count, tirpur_count)
      this.pieChartData.push(coimbatore, erode, nilgiris, tirpur)
      console.log(this.pieChartData)
      this.chartOptions = {
        series: [coimbatore, erode, nilgiris, tirpur],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: [coimbatore_count, erode_count, nilgiris_count, tirpur_count],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }
  GetChart1() {
    let api = `${environment.api_url}/api/renewpiechart1`;
    this.httpClient.get(api).subscribe((res: any) => {
      let selected = res.selected
      let rejected = res.rejected
      let total = res.total
      let selected_count = 'Selected List - ' + res.selected
      let rejected_count = 'Rejected List - ' + res.rejected
      let total_count = 'Total - ' + res.total
      this.pieChartLabels1.push(total_count, selected_count, rejected_count)
      this.pieChartData1.push(total, selected, rejected)
      this.chartOptions1 = {
        series: [selected, rejected],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: [selected_count, rejected_count],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }
  downloadbulk() {
    let api = `${environment.api_url}/api/bulkdownload`;
    window.open(api)
    // this.httpClient.get(api).subscribe((res: any) => {
    //   console.log(res)
    // });
  }
  OnKeyup(event:any,data:any){
  console.log("insideloop",data,event)
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.select.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
  ngOnInit() {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
      });
    this.getSelected()
    this.GetChart()
    this.GetChart1()
  }
}
@Component({
  selector: 'app-rejectedrenewal',
  templateUrl: './rejectedrenewal.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class RejectedRenewalComponent {
  rejected: any;
  select: any;
  loading: boolean = false
  searchValue = '';
  visible = false;
  listOfDisplayData: any;
  name: any
  district: any
  applicationNumber: any
  remark = new FormControl('');
  onoff: boolean = false;
  constructor(private httpClient: HttpClient,private notification: NzNotificationService) { }
  ngOnInit() {
    this.getrejected()
  }
  getaadhar(aadhar:any){
    let str ='';
    str = environment.image_url+aadhar
   return str
   }
  getrejected() {
    this.remark.reset()
    this.loading = true
    let api = `${environment.api_url}/api/renewrejected`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.rejected = res.data
        this.loading = false
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  refresh(){
    this.getrejected() 
  }
  Switch(event:any,data:any){
    console.log(data,event)
    let url = `${environment.api_url}/api/renewalaccepted`;
    this.httpClient.post(url, {remark_status:event,remarks:this.remark.value,id:data,}).subscribe((res: any) => {
      if (res.success) {
        let type: string = 'error'
        console.log('oops', res.errors)
        this.notification.create(
          type,
          'Error!!',
          'This Application was Accepted!!')
      }
      if(res){
        this.getrejected() 
      }
      if (res.failed) {
        let type: string = 'error'
        this.notification.create(
          type,
          'Failed!!',
          'Sorry something went wrong!')
      }
     
    });
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.select.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
  OnKeyup(event:any,data:any){
    this.remark = data.remark
    console.log("insideloop",data,event)
    }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class FooterComponent {
}