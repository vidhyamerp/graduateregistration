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
// import {jsPDF} from 'jspdf';
declare function myFunction(aadhar:any):any ;
import { GlobalService } from 'src/service/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {

  }
  log(): void {
    console.log('click dropdown button');
  }

  ngOnInit() {
    if(localStorage.getItem('userdata')){
         
    }
   }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})

export class HomeComponent {
  agreedata = new FormControl('', [Validators.required]);
  user:any= {}
  getuser: any;
  constructor(private fb: FormBuilder, private router: Router, private httpClient: HttpClient,private elRef: ElementRef, private renderer: Renderer2,private currentUser: GlobalService) {
    // this.api = `${environment.api_url}/upload`
    this.user = localStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggedusermy',this.getuser)
  }
  
  async register() {
    if (!this.agreedata.value) {
      window.alert('Please Agree to Continue')
      return
    }
    this.router.navigate(['/registration'])
  }
  // generatePdf(){

  // }
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }
  agree(e: any) {
    if (e) {
      console.log(e)
    }
    console.log('else')
  }
 
  ngOnInit() {

  }
  
}
@Component({
  selector: 'app-innerheader',
  templateUrl: './innerheader.component.html',
  styleUrls: ['./app.component.css']
})
export class InnerHeaderComponent  {

}                                           
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./app.component.css']
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
}
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./app.component.css']
})

export class AdminLoginComponent {
  validateForm = new FormGroup({})
  emailerror: boolean = false;
  passerror: boolean = false;
  response: any;
  id: any;
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService,private currentUser: GlobalService) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }
  ngOnInit() { }
  async submitForm() {
    console.log(this.validateForm)
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // if (this.validateForm.valid) {
    //   this.router.navigate(['/studentdetails'])
    // } else {
    //   return
    // }
    console.log(this.validateForm.value)
    let url = `${environment.api_url}/api/login`;
    this.http.post(url, this.validateForm.value).subscribe((res: any) => {
      this.response = res
      console.log("response", this.response)
      if (this.response.data) {
        this.id = this.response.data
        if(this.id.role != 'authority'){
        let api = `${environment.api_url}/api/edit/${this.id.id}`;
        this.http.get(api).subscribe((res: any) => {
         console.log(res)
         if(res.data){
          this.router.navigate(['/registration'])
         }else{
          this.router.navigate(['/home'])
         }
        });
        this.currentUser.setUser(this.id);
        localStorage.setItem('userdata', JSON.stringify(this.id));
      }
      else{
        this.router.navigate(['/studentdetails'])
      }
    }
      if (this.response.falied) {
        this.response = this.response.falied
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
  styleUrls: ['./app.component.css'],
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
  constructor(private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService,private currentUser: GlobalService,private activatedRoute: ActivatedRoute) {
    this.user = localStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      aadhar_number: ['', Validators.required],
      father_or_husband_name: ['', Validators.required],
      present_address: this.fb.array([]),
      declaration: [false, Validators.required],
      mobile_no: ['', Validators.required],
      occupation: ['', Validators.required],
      qualification: this.fb.array([]),
      same_add: [false],
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
      address_proof: '',
      aadhar_proof: [],
      deg_provitional_cerificate: '',
      signature: '',
      photo: '',
      original_add1: [''],
      original_add2: [''],
      districts: [''],
      date_of_birth: [''],
      name_of_degree: [''],
      name_of_university: [''],
      year_of_passing: [''],
      user_id:[''],
      zip_password:['']
    });
    this.addQuantity()
    this.addAddress()
    this.addResAddress()
  }
  ngOnInit() {
    this.presentaddress.get('state').setValue('Tamil Nadu')
    this.sameaddress.get('same_state').setValue('Tamil Nadu')
    if (this.form.controls.aadhar_number.valid) {
      this.showtick = 'success'
    }
    console.log(this.form.controls)
    let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
        this.http.get(api).subscribe((res: any) => {
         console.log(res)
         this.fetch  = res.data
         this.form.controls.name.setValue(this.fetch.name)
         this.form.controls.aadhar_number.setValue(this.fetch.aadhar_number)
         this.form.controls.father_or_husband_name.setValue(this.fetch.father_or_husband_name)
         this.form.controls.declaration.setValue(this.fetch.declaration)
         this.form.controls.mobile_no.setValue(this.fetch.mobile_no)
         this.form.controls.occupation.setValue(this.fetch.occupation)
         this.form.controls.same_add.setValue(this.fetch.same_add)
         this.form.controls.challan_no.setValue(this.fetch.challan_no)
         this.form.controls.amount.setValue(this.fetch.amount)
         this.form.controls.bank_name.setValue(this.fetch.bank_name)
         this.form.controls.date.setValue(this.fetch.date)
         this.form.controls.dd_check.setValue(this.fetch.dd_check)
         if (this.fetch.present_address.indexOf(',') > -1) 
         { 
          let obj = this.fetch.present_address.split(',');
          console.log("fext",obj)
          this.presentaddress.get('address_1').setValue(obj[0])
          this.presentaddress.get('address_2').setValue(obj[1])
          this.presentaddress.get('city').setValue(obj[2])
          this.presentaddress.get('district').setValue(obj[3])
          this.presentaddress.get('state').setValue(obj[4])
          this.presentaddress.get('pincode').setValue(obj[5])
        }
        if (this.fetch.residential_add.indexOf(',') > -1) 
         { 
          let obj = this.fetch.residential_add.split(',');
          console.log("fext",obj)
          this.sameaddress.get('same_address_1').setValue(obj[0])
          this.sameaddress.get('same_address_2').setValue(obj[1])
          this.sameaddress.get('same_city').setValue(obj[2])
          this.sameaddress.get('same_district').setValue(obj[3])
          this.sameaddress.get('same_state').setValue(obj[4])
          this.sameaddress.get('same_pincode').setValue(obj[5])
        }
         this.form.controls.certificate_decl.setValue(this.fetch.certificate_decl)
         this.form.controls.gender.setValue(this.fetch.gender)
         this.form.controls.residential_decl.setValue(this.fetch.residential_decl)
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
        this.form.controls.address_proof.setValue(this.fetch.address_proof)
        this.form.controls.aadhar_proof.setValue(this.fetch.aadhar_proof)
        this.form.controls.deg_provitional_cerificate.setValue(this.fetch.deg_provitional_cerificate)
        this.form.controls.signature.setValue(this.fetch.signature)
        this.form.controls.photo.setValue(this.fetch.photo)
         this.form.controls.districts.setValue(this.fetch.districts)
         this.form.controls.date_of_birth.setValue(this.fetch.date_of_birth)
         this.form.controls.name_of_degree.setValue([this.fetch.name_of_degree])
         this.form.controls.name_of_university.setValue([this.fetch.university])
         this.form.controls.year_of_passing.setValue([this.fetch.year_of_passing])
         let arr2 = this.fetch.degree_name.split(',')
         console.log(arr2)
      for(var i=0;i<=arr2.length;i++){
          let langArr = <FormArray>this.qualifications.controls["degree_name"];
          langArr.controls[arr2[i]].setValue(true);
        }
        let arr = [this.fetch.university]
          arr.forEach((element:any) => {
          console.log("univ",element)
          let obj = element.split(',');
          // univ.push("obj",obj)
         
        });
        let arr1 = [this.fetch.year_of_passing]
        arr1.forEach((element:any) => {
          console.log("univ",element)
          let obj1 = element.split(',');
          // univ.push("obj",obj)
          // (this.form.get("qualification") as FormArray).setValue(obj1)
           this.qualifications.setValue({year_passing:obj1})
        });
         this.form.controls.year_of_passing.setValue(this.fetch.year_of_passing)
         console.log("fetch",this.fetch)
        });
  }
  Trigger(){
    // this.result = myFunction(this.form.controls.aadhar_number.value);
    // console.log('popup',this.result)
      let api = `${environment.api_url}/api/extract`;
      let dd :any = this.file_name;
      console.log(this.file_name)
      this.http.get(api,dd).subscribe((res: any) => {
        this.response = res
        console.log("response", this.response)
      });
  }
  
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
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
  triggerdetails1(e: any) {
    console.log(e)
    if (e === '1') {
      this.show_dd_details = true
    }
    else {
      this.show_dd_details = false
    }
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
    this.uploadloading = true;
    this.fileToUpload = files.item(0);
    let aadhar = new FormData();
    aadhar.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/aadharupload', aadhar).subscribe((res: any) => {
      console.log(res);
      this.file_name = res.file_name
      if (res.data) {
        this.aadhar = res.data
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

  postMethod1(files: FileList) {
    this.uploadloading = true;
    this.fileToUpload = files.item(0);
    let aadhar = new FormData();
    aadhar.append('file', this.fileToUpload, this.fileToUpload.name);
    // console.log(files)
    this.http.post(environment.api_url+'/api/upload', aadhar).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.aadhar = res.data
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
        this.address_proof = res.data
        this.form.controls.address_proof.setValue(res.file_name)
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
        this.uploadloading = true;
      }
      if (res.data) {
        this.degree_certificate = res.data
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
        this.uploadloading = true;
      }
      if (res.data) {
        this.photo = res.data
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
        this.signature = res.data
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
   console.log(this.qualifications.get('degree_name').value)
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
      console.log("response", this.response)
      if (this.response.data) {
        this.fetch = this.response.data
        this.form.controls.id.setValue(this.fetch.id)
        this.form.controls.name.setValue(this.fetch.name)
        this.form.controls.aadhar_number.setValue(this.fetch.aadhar_number)
        this.form.controls.father_or_husband_name.setValue(this.fetch.father_or_husband_name)
        this.form.controls.declaration.setValue(this.fetch.declaration)
        this.form.controls.mobile_no.setValue(this.fetch.mobile_no)
        this.form.controls.occupation.setValue(this.fetch.occupation)
        this.form.controls.same_add.setValue(this.fetch.same_add)
        this.form.controls.challan_no.setValue(this.fetch.challan_no)
        this.form.controls.amount.setValue(this.fetch.amount)
        this.form.controls.bank_name.setValue(this.fetch.bank_name)
        this.form.controls.date.setValue(this.fetch.date)
        this.form.controls.dd_check.setValue(this.fetch.dd_check)
        if (this.fetch.present_address.indexOf(',') > -1) 
        { 
         let obj = this.fetch.present_address.split(',');
         console.log("fext",obj)
         this.presentaddress.get('address_1').setValue(obj[0])
         this.presentaddress.get('address_2').setValue(obj[1])
         this.presentaddress.get('city').setValue(obj[2])
         this.presentaddress.get('district').setValue(obj[3])
         this.presentaddress.get('state').setValue(obj[4])
         this.presentaddress.get('pincode').setValue(obj[5])
       }
       if (this.fetch.residential_add.indexOf(',') > -1) 
        { 
         let obj = this.fetch.residential_add.split(',');
         console.log("fext",obj)
         this.sameaddress.get('same_address_1').setValue(obj[0])
         this.sameaddress.get('same_address_2').setValue(obj[1])
         this.sameaddress.get('same_city').setValue(obj[2])
         this.sameaddress.get('same_district').setValue(obj[3])
         this.sameaddress.get('same_state').setValue(obj[4])
         this.sameaddress.get('same_pincode').setValue(obj[5])
       }
        this.form.controls.certificate_decl.setValue(this.fetch.certificate_decl)
        this.form.controls.gender.setValue(this.fetch.gender)
        this.form.controls.residential_decl.setValue(this.fetch.residential_decl)
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
       this.form.controls.address_proof.setValue(this.fetch.address_proof)
       this.form.controls.aadhar_proof.setValue(this.fetch.aadhar_proof)
       this.form.controls.deg_provitional_cerificate.setValue(this.fetch.deg_provitional_cerificate)
       this.form.controls.signature.setValue(this.fetch.signature)
       this.form.controls.photo.setValue(this.fetch.photo)
        this.form.controls.districts.setValue(this.fetch.districts)
        this.form.controls.date_of_birth.setValue(this.fetch.date_of_birth)
        this.form.controls.name_of_degree.setValue(this.fetch.name_of_degree)
        this.form.controls.name_of_university.setValue(this.fetch.university)
        let arr2 = this.fetch.degree_name.split(',')
        console.log(arr2)
     for(var i=0;i<=arr2.length;i++){
         let langArr = <FormArray>this.qualifications.controls["degree_name"];
         langArr.controls[arr2[i]].setValue(true);
       }
       let arr = [this.fetch.university]
         arr.forEach((element:any) => {
         console.log("univ",element)
         let obj = element.split(',');
         // univ.push("obj",obj)
         this.qualifications.setValue({university_name:obj})
       });
       let arr1 = [this.fetch.year_of_passing]
       arr1.forEach((element:any) => {
         console.log("univ",element)
         let obj1 = element.split(',');
         // univ.push("obj",obj)
         // (this.form.get("qualification") as FormArray).setValue(obj1)
          this.qualifications.setValue({year_passing:obj1})
       });
        this.form.controls.year_of_passing.setValue(this.fetch.year_of_passing)
        console.log("fetch",this.fetch)
        this.id = this.response.data.id
         let type: string = 'success';
        let message = 'Data saved Successfully';
        this.notification.create(
          type,
          'Success!!',
          message)
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
    if (!this.form.controls.declaration.value) {
      window.alert('Please check Agree the self declaration')
      return
    }
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
     console.log(this.qualifications.get('degree_name').value)
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

    let url = `${environment.api_url}/api/store`;
    this.http.post(url, this.form.value,dd).subscribe((res: any) => {
      this.response = res
      console.log("response", this.response)
      if (this.response.data) {
        // console.log("welcome")
        this.router.navigate(['/downloadpdf/', this.response.data.id])
        this.id = this.response.data.id
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
  styleUrls: ['./app.component.css']
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
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  user: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private router: Router) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
    this.user = localStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
  }
  ngOnInit() {
    let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
      this.url = res.data
      this.photo = environment.image_url + this.url.photo
      this.sign = environment.image_url + this.url.signature
      this.degree = environment.image_url + this.url.deg_provitional_cerificate
      this.add_proof = environment.image_url + this.url.address_proof
      this.aadhar_proof = environment.image_url + this.url.aadhar_proof
      console.log("repsosn",this.url)
    });
  }
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }
  
  public downloadAsPDF() {
       let api = `${environment.api_url}/api/downloadPDF/${this.getuser.id}`;
       window.open(api)
  }
}

@Component({
  selector: 'app-rejectedstudent',
  templateUrl: './rejectedstudent.component.html',
  styles: [`
  .search-box {
    padding: 8px;
  }
  
  .search-box input {
    width: 188px;
    margin-bottom: 8px;
    display: block;
  }
  
  .search-box button {
    width: 90px;
  }
  
  .search-button {
    margin-right: 8px;
  }
  .table-operations {
    margin-bottom: 16px;
  }

  .table-operations > button {
    margin-right: 8px;
  }
  `]
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
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.getrejected()
  }
  getaadhar(aadhar:any){
    let str ='';
    str = environment.image_url+aadhar
   return str
   }
  getrejected() {
    let api = `${environment.api_url}/api/rejected`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.rejected = res.data;
      if (!this.rejected) {
        this.loading = true
      }
      else {
        this.loading = false
      }
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
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
  styleUrls: ['./app.component.css'],
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
  constructor(private httpClient: HttpClient, private router: Router) {
    this.user = localStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  
  getaadhar(aadhar:any){
   let str ='';
   str = environment.image_url+aadhar
  return str
  }
  public downloadAsPDF(id:any) {
    let api = `${environment.api_url}/api/downloadIndividual/${id}`;
    window.open(api)
}
  getSelected() {
    let api = `${environment.api_url}/api/selected`;
    this.httpClient.get(api).subscribe((res: any) => {
      this.select = res.data;
      console.log("selected",this.select)
      if (!this.select) {
        this.loading = true
      }
      else {
        this.loading = false
      }
    });
  }
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }
 
  GetChart() {
    let api = `${environment.api_url}/api/piechart`;
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
    let api = `${environment.api_url}/api/piechart1`;
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
  download() {
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
    this.getSelected()
    this.GetChart()
    this.GetChart1()
  }
}

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./app.component.css'],
})
export class NewUserComponent {
  validateForm: FormGroup;
  response: any;
  id: any;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      mobile_no: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
  submitForm() {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(this.validateForm.value)
    let url = `${environment.api_url}/api/storeuser`;
    this.http.post(url, this.validateForm.value).subscribe((res: any) => {
      this.response = res
      console.log("response", this.response)
      if (this.response.data) {
        this.id = this.response
        this.router.navigate([''])
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
  styleUrls: ['./app.component.css']
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
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private router: Router) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
    this.user = localStorage.getItem('userdata')
    this.getuser = JSON.parse(this.user); 
    console.log('loggeduserreg',this.getuser)
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    let api = `${environment.api_url}/api/edit/${this.getuser.id}`;
    this.http.get(api).subscribe((res: any) => {
      this.url = res.data
      this.photo = environment.image_url + this.url.photo
      this.sign = environment.image_url + this.url.signature
      this.degree = environment.image_url + this.url.deg_provitional_cerificate
      this.add_proof = environment.image_url + this.url.address_proof
      this.aadhar_proof = environment.image_url + this.url.aadhar_proof
      console.log("repsosn",this.url)
    });
  }
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }
 
}