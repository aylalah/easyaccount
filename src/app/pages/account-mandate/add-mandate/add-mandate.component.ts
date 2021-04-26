import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-mandate',
  templateUrl: './add-mandate.component.html',
  styleUrls: ['./add-mandate.component.css']
})
export class AddMandateComponent implements OnInit {

  current = 0;

  index = 'First-content';
  response: any;
  resMessage: any;
  responsecode: any;
  error: any;
  success: any;

  public CustomerForm = {
    CustomerFile: null,
    staffId: null,
  };

  public mandate = {
    accountNumber: null,
    imageFile: null,
    signatureFile: null,
  };


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  fileInputLabel2: string;
  fileInputLabel3: string;

  myFiles: string [] = [];
  sMsg = '';

  arrayBuffer: any;
  file: File;


  disabled = false;
  profResponds: any;
  me: any;
  myId: any;
  isSuccess: any;
  batchNumber: any;
  type: string;
  account = 'account';
  myFile: string | ArrayBuffer;
  ImageFile: string | ArrayBuffer;
  SignatureFile: string | ArrayBuffer;
  cardImageBase64: any;
  isImageSaved: boolean;
  disabledv: boolean;
  loadDetails: boolean;
  accountResponse: any;
  accountDetails2: any;
  resMessage2: any;
  responsecode2: any;
  showsDetailsv: boolean;
  showsDetails: boolean;
  response2: any;
  constructor(
    private Jarwis: JarwisService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private customerAccount: CustomerAccountService,
    private AccountMandate: AccountMandateService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  tab(val): void {
    this.current = val;
    this.changeContent();
    this.batchNumber = '';
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  validAccoundNumber(): void{
    this.disabledv = true;
    this.loadDetails = true;
    if (this.mandate.accountNumber === '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
    } else {

      this.customerAccount.AccountInquiry(this.mandate.accountNumber).subscribe(
        data => {
          this.disabledv = false;
          this.accountResponse = data;
          this.accountDetails2 = this.accountResponse.accountDetails;
          this.resMessage2 = this.accountResponse.responseMessage;
          this.responsecode2 = this.accountResponse.responseCode;
          this.loadDetails = false;
          this.showsDetailsv = true;

          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Valid Account Number',
            );
            this.error = '';
          }
        },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabledv = false;
          this.showsDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;

          if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              this.response2,
            );
          }
        },
      );

    }
  }

  onFileSelect3(event): void{

    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.fileInputLabel3 = file.name;
      const reader1 = new FileReader();

      const vm = this;

      reader1.onloadend = () => {
        this.ImageFile = reader1.result;
      };
      reader1.readAsDataURL(file);
    }

  }

  onFileSelect2(event): void{

    if (event.target.files.length > 0) {

      const files = event.target.files[0];
      this.fileInputLabel2 = files.name;
      const reader = new FileReader();

      reader.onloadend = () => {
        this.SignatureFile = reader.result;
      };
      reader.readAsDataURL(files);
    }
  }


  onFileSelect(event): void {
    // const af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = event.target.files[0];

      this.fileInputLabel = file.name;
      this.fileUploadForm.get('myfile').setValue(file);
    }
  }
  onSubmitBulkMandate(){

    this.disabled = true;
    if (!this.fileUploadForm.get('myfile').value) {
      this.disabled = false;
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        'Please fill valid details!'
      );
      return false;
    } else{

      const formData: FormData = new FormData();
      formData.append('mandateFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.AccountMandate.CreateBulkMandate(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }

  }

  onSubmitSingleMandate(): void{
    this.disabled = true;
    // this.mandate.imageFile = this.ImageFile;
    // this.mandate.signatureFile = this.SignatureFile;

    const img: any = this.ImageFile;
    this.mandate.imageFile = img.slice(22, img.length);

    const sign: any = this.SignatureFile;
    this.mandate.signatureFile = sign.slice(22,  sign.length);

    console.log(this.mandate);
    this.AccountMandate.CreateMandate(this.mandate).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data): void{
    this.disabled = false;
    this.responsecode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.batchNumber =  data.batchNumber;

    this.uploadFileInput.nativeElement.value = '';
    this.fileInputLabel = undefined;

    if (this.isSuccess === true) {
      this.type = 'success';
      this.modal.success({
        nzTitle: 'Operation successfull',
        nzContent: 'Batch Number: ' + this.batchNumber,
      });
      this.mandate.accountNumber = '';
      this.fileInputLabel3 = '';
      this.fileInputLabel2 = '';
      this.fileInputLabel = '';
    }
  }

  handleError(error): void{
    this.disabled = false;
    this.response = error.error.errorResponse;

    this.uploadFileInput.nativeElement.value = '';
    this.fileInputLabel = undefined;

    if (this.responsecode === 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        this.resMessage,
        this.response
      );
    }

    if (this.responsecode !== 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        this.response
      );
    }
  }

}
