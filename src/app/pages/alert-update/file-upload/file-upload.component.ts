import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import {AlertService} from 'src/app/Services/alert.service';
import { NzModalService } from 'ng-zorro-antd/modal';

interface ItemData {
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

public alertPayload = {
  alertFile: '',
};

public phoneHeaher = {
  code: '+234',
  state: '(0)',
  number: '',
};

public deleteRow = {
  accountNumber: '',
  phoneNumber: null,
  email: null,
};

public search = {
  accountNumber: '',
};

// @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
fileUploadForm: FormGroup;
fileInputLabel: string;

myFiles: string [] = [];
sMsg = '';

arrayBuffer: any;
file: File;
myFile: string | ArrayBuffer;

listOfData: ItemData[] = [];
visible = false;
individualAccount: any;
corporateAccount: any;
current = 0;
loading: boolean;
index = 'Create-Alert';
batchNumber: string;
rowId: number;
pendindMandate: any;
error: string;
disabled: boolean;
loadDetails: boolean;
accountResponse: any;
accountDetails2: any;
resMessage2: any;
responsecode2: any;
type: string;
response2: any;
disabledv = false;
showsDetailsv = false;
alertRecords: any;
responseCode: any;
isSuccess: any;
mandate: any;
fileInputLabel3: string;
fileInputLabel2: string;
response: any;
uploadFileInput: any;
responsecode: number;
account_name: any;
errorResponse: any;
  id: string;
constructor(
  private Jarwis: JarwisService,
  private Token: TokenService,
  private router: Router,
  private Auth: AuthService,
  private AccountMandate: AccountMandateService,
  private message: NzMessageService,
  private modal: NzModalService,
  private notification: NzNotificationService,
  private customerAccount: CustomerAccountService,
  private alertService: AlertService,
  private formBuilder: FormBuilder,
) { }
expandSet = new Set<number>();
expandSet2 = new Set<number>();

ngOnInit(): void {
  for (let i = 0; i < 100; i++) {
    this.listOfData.push({
      name: `Edward King ${i}`,
      age: 32,
      address: `London`
    });
  }

  this.fileUploadForm = this.formBuilder.group({
    myfile: ['']
  });
}

onSearch(){
  this.loading = true;
  const sortField: any = this.search.accountNumber;
  this.alertService.GetAccountAlertDetails(sortField).subscribe(
    data => {
      const GetAccountAlertDetails: any = data;
      this.alertRecords = GetAccountAlertDetails.alertRecords;

      this.responseCode = GetAccountAlertDetails.responseCode;
      this.isSuccess = GetAccountAlertDetails.isSuccess;
      this.errorResponse =  GetAccountAlertDetails.errorResponse;
      this.loading = false;
      if (this.isSuccess) {

        if ( this.alertRecords.length >= 0) {
          this.type = 'success';
          this.notification.create(
            this.type,
            'Great, Operation Successful',
            'See Details',
          );
          this.error = '';
        } else {
          this.type = 'error';
          this.notification.create(
            this.type,
            'Operation not Successful',
            'Invalid Account Number',
          );
        }
      }else{
        this.type = 'error';
        this.notification.create(
          this.type,
          'Invalid',
          this.errorResponse
        );
      }
    },
    error => {
      this.loading = false;
    }
  );

}

onDeleteRow( accountNumber: string,  phoneNumber: string,  email: string){

  this.deleteRow.accountNumber = accountNumber;
  this.deleteRow.phoneNumber = phoneNumber;
  this.deleteRow.email = email;

  this.modal.confirm({
    nzTitle: 'Are you sure delete this task?',
    nzContent: '<b style="color: red;">Some descriptions</b>',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.DeleteAlertDetails(),
    nzCancelText: 'No',
    nzOnCancel: () => console.log('Cancel')
  });
}

DeleteAlertDetails(){
  this.loading = true;
  this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
  this.alertService.DeleteAlertDetails(this.deleteRow).subscribe(
    data => {
      const DeleteAlertDetails: any = data;
      this.alertRecords = DeleteAlertDetails.alertRecords;

      this.responseCode = DeleteAlertDetails.responseCode;
      this.isSuccess = DeleteAlertDetails.isSuccess;
      this.errorResponse =  DeleteAlertDetails.errorResponse;


      this.loading = false;
      if (this.isSuccess) {

        if ( this.alertRecords.length >= 0) {
          this.message.remove(this.id);
          this.type = 'success';
          this.notification.create(
            this.type,
            'Great, Operation Successful',
            'See Details',
          );
          this.error = '';
        } else {
          this.message.remove(this.id);
          this.type = 'error';
          this.notification.create(
            this.type,
            'Operation not Successful',
            'Invalid Account Number',
          );
        }
      }else{
        this.type = 'error';
        this.notification.create(
          this.type,
          'Invalid',
          this.errorResponse
        );
      }
    },
    error => {
      this.loading = false;
    }
  );

}

onSearchCouncle(){
  this.search.accountNumber = '';
}


open(): void {
  this.visible = true;
}

clear(): void {
  this.alertPayload.alertFile = '';
  this.deleteRow.accountNumber = '';
  this.deleteRow.phoneNumber = '';
  this.deleteRow.email = '';
  this.search.accountNumber =  '';
  this.account_name = '';
  this.phoneHeaher.number = '';
  this.current = 0;
  this.changeContent();
}

again(): void {
  this.clear();
  this.current = 0;
  this.changeContent();
}

close(): void {
  this.visible = false;
  this.clear();
}

changeContent(): void {
  switch (this.current) {
    case 0: {
      this.index = 'Create-Alert';
      break;
    }
    case 1: {
      this.index = 'View-details';
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



 onFileSelect(event): void {
    const af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = event.target.files[0];
      console.log(file);

      if (!_.includes(af, file.type)) {

        this.type = 'error';
        this.notification.create(
          this.type,
          'Operation Failed',
          'Only EXCEL Docs Allowed!'
        );

      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
        this.alertPayload.alertFile = this.fileUploadForm.get('myfile').value;
      }
    }
  }



onSubmitSingle(): void{
  this.disabled = true;
  this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
  if (!this.fileUploadForm.get('myfile').value) {
    this.disabled = false;
    this.type = 'error';
    this.notification.create(
      this.type,
      'Operation not successfull',
      'Please fill valid details!'
    );
  } else{

    const formData = new FormData();
    formData.append('alertFile', this.fileUploadForm.get('myfile').value);

    console.log(formData);

  //   console.log(this.alertPayload);
    this.alertService.ProfileAlertUpload(formData).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
 }

}

handleResponse(data): void{
  this.disabled = false;
  this.message.remove(this.id);
  console.log(data);
  this.responseCode = data.responseCode;
  this.isSuccess = data.isSuccess;
  this.errorResponse =  data.errorResponse;

  if (this.isSuccess) {

    this.alertRecords = data.alertRecords;
    this.batchNumber = data.batchNumber;
    this.type = 'success';
    this.modal.success({
      nzTitle: 'Operation successfull',
      nzContent: 'Batch ID:' + ' ' + this.batchNumber,
    });
    this.current += 1;
    this.changeContent();
  }
}

handleError(error): void{
  this.disabled = false;
  this.message.remove(this.id);
  this.response = error.error.errorResponse;

  if (this.responsecode === 3) {
    this.type = 'error';
    this.notification.create(
      this.type,
      'Failed',
      this.response
    );
  }
}

}
