
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent implements OnInit {

  public alertPayload = {
    accountNumber: '',
    phone_number: null,
    email: null,
    showBalance: null
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
  fileInputLabel: string;
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
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private alertService: AlertService,
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
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.alertService.DeleteAlertDetails(this.deleteRow).subscribe(
      data => {
        const DeleteAlertDetails: any = data;
        this.alertRecords = DeleteAlertDetails.alertRecords;

        this.responseCode = DeleteAlertDetails.responseCode;
        this.isSuccess = DeleteAlertDetails.isSuccess;
        this.errorResponse =  DeleteAlertDetails.errorResponse;


        this.loading = false;
        if (this.isSuccess) {
          this.nzMessageService.remove(this.id);
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
          this.nzMessageService.remove(this.id);
          this.type = 'error';
          this.notification.create(
            this.type,
            'Invalid',
            this.errorResponse
          );
        }
      },
      error => {
        this.nzMessageService.remove(this.id);
        this.loading = false;
      }
    );

  }

  onSearchCouncle(){
    this.search.accountNumber = '';
    this.alertRecords = '';
  }


  open(): void {
    this.visible = true;
  }

  clear(): void {
    this.alertPayload.accountNumber = '';
    this.alertPayload.phone_number = '';
    this.alertPayload.email = '';
    this.alertPayload.showBalance = '';
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

  onAction(val1, val2): void{
    if (val1 === 'yes'){
      this.alertPayload.showBalance = 'Y';
    }else{
      this.alertPayload.showBalance  = 'N';
    }
  }

  validAccoundNumber(): void{
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.disabledv = true;
    if (this.alertPayload.accountNumber === '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabledv = false;
      this.loadDetails = false;
      this.showsDetailsv = false;
    } else {

      this.customerAccount.AccountInquiry(this.alertPayload.accountNumber).subscribe(
        data => {
          this.accountResponse = data;
          this.resMessage2 = this.accountResponse.responseMessage;
          this.responsecode2 = this.accountResponse.responseCode;
          this.accountDetails2 = this.accountResponse.accountDetails;
          this.loadDetails = false;
          this.disabledv = false;

          if (this.responsecode2 === '0') {
          this.nzMessageService.remove(this.id);
          if ( this.accountDetails2 != null) {
            this.account_name = this.accountDetails2.account_name;
            this.showsDetailsv = true;
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Valid Account Number',
            );
            this.error = '';
          } else {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Invalid Account Number',
            );
          }
        }else {
          this.nzMessageService.remove(this.id);
          this.notification.create(
            'error',
            this.resMessage2,
            this.response2,
          );
        }
      },
        error => {
          this.nzMessageService.remove(this.id);
          this.error = 'Invalid credentials';
          this.disabledv = false;
          this.loadDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;

          if (this.responsecode2 !== 0) {
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


  onSubmitSingle(): void{
    this.disabled = true;
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.alertPayload.phone_number = this.phoneHeaher.code + this.phoneHeaher.state + this.phoneHeaher.number;
    console.log(this.alertPayload);
    this.alertService.AlertsProfile(this.alertPayload).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data): void{
    this.disabled = false;
    this.nzMessageService.remove(this.id);
    this.responseCode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.errorResponse =  data.errorResponse;

    if (this.isSuccess) {

      this.alertRecords = data.alertRecords;
      this.type = 'success';
      this.modal.success({
        nzTitle: 'Operation successfull',
        nzContent: '',
      });
      this.current += 1;
      this.changeContent();
    }
  }

  handleError(error): void{
    this.disabled = false;
    this.nzMessageService.remove(this.id);
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
