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
import {myFunction} from '../assets/js/custom.js';

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

  ngOnInit() { }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})

export class HomeComponent {
  agreedata = new FormControl('', [Validators.required]);
  // api: string;
  constructor(private fb: FormBuilder, private router: Router, private httpClient: HttpClient,private elRef: ElementRef, private renderer: Renderer2) {
    // this.api = `${environment.api_url}/upload`
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
  agree(e: any) {
    if (e) {
      console.log(e)
    }
    console.log('else')
  }
 
  ngOnInit() {

  }
  isShow = true;
  @HostListener('click', ['$event']) toggleOpen() {
    const nextEl = this.renderer.nextSibling(this.elRef.nativeElement);
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.renderer.addClass(nextEl, 'toggled');
    } else {
      this.renderer.removeClass(nextEl, 'toggled');
    }
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
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService) {
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
        this.id = this.response
        this.router.navigate(['/home'])
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
  styles: [''],
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
  Pattern = '^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$';
  constructor(private http: HttpClient, private router: Router, private msg: NzMessageService, private notification: NzNotificationService) {
    // private uploader: UploaderService
    this.form = this.fb.group({
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
      year_of_passing: ['']
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
  }
  Trigger(){
    myFunction(this.form.controls.aadhar_number.value);
  }
  //  ValidateAadhar(control: AbstractControl) {
  //     if (control.value === 'adminbu@gmail.com') {
  //       return false;
  //     } else {
  //       return { emailExists: true };
  //     }
  //   }
  triggerdetails(e: any) {
    console.log(e)
    if (e === '1') {
      this.show_dd_details = true
    }
    else {
      this.show_dd_details = false
    }
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
  async submitform() {
    if (!this.form.controls.declaration.value) {
      window.alert('Please check Agree the self declaration')
      return
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
    let url = `${environment.api_url}/api/store`;
    this.http.post(url, this.form.value).subscribe((res: any) => {
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
  // validates Aadhar number received as string
  validate(data: any) {
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ]

    // permutation table
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ]
    let c = 0
    let invertedArray = data

    invertedArray.forEach((val: number, i: number) => {
      c = d[c][p[(i % 8)][val]]
    })

    return (c === 0)
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
  url: any = {};
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    // this.html = dom.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");

  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  
  public downloadAsPDF() {
       let api = `${environment.api_url}/api/downloadPDF/${this.id}`;
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
  constructor(private httpClient: HttpClient) {
  }
  
  getaadhar(aadhar:any){
   let str ='';
   str = environment.image_url+aadhar
  return str
  }
  public downloadAsPDF(id:any) {
    let api = `${environment.api_url}/api/downloadPDF/${id}`;
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

  // resetForm(e: MouseEvent): void {
  //   e.preventDefault();
  //   this.validateForm.reset();
  //   for (const key in this.validateForm.controls) {
  //     this.validateForm.controls[key].markAsPristine();
  //     this.validateForm.controls[key].updateValueAndValidity();
  //   }
  // }

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