import { Component, OnInit } from '@angular/core';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {

  disabled: boolean;
  disabled2= false;
  response: any;
  resMessage: any;
  myId: any;
  disableSubmitBotton = true;
  users: any;
  responsecode: any;
  success: any;
  account = 'new';
  visible = false;
  public approval = {
    approveOrReject: null,
	  id: null,
    comment: null
  };
  viewVisible = false;
  childrenVisible = false;
  tabName: any;
  indextab = 'First-content';
  currenttab: any;
  loading: boolean;
  individualAccountCount: any;
  individualAccount: any;
  accountOpenings: any;
  accountOpeningsCount: any;
  RejectedInquiry: any;
  RejectedInquiryCount: any;
  accountNumber: any;
  customerId: any;
  responseCode: any;
  isSuccess: any;
  inquiryAccountOp: any;
  requestType: any;
  rbatchId: string;

  constructor(
    private modal: NzModalService,
    private customerAccount: CustomerAccountService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private ngxService: NgxUiLoaderService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.actRoute.paramMap.subscribe((params => {
      const val = params.get('id');
      this.rbatchId = val;
      this.tab(this.rbatchId);
    }));

    this.customerAccount.IndividualAccountPendAuth().subscribe(
      data => {
        const IndividualAccountPend: any = data;
        this.individualAccount = IndividualAccountPend.details;
        this.individualAccountCount = this.individualAccount.length;
        this.loading = false;
      },
      _error => {
        this.loading = false;
      }
    );
    this.customerAccount.AccountOpeningAuthorized().subscribe(
      data => {
        const AccountOpeningAuthorized: any = data;
        this.accountOpenings = AccountOpeningAuthorized.details;
        this.accountOpeningsCount = this.accountOpenings.length;
      },
      _error => {
        this.loading = false;
      }
    );

    this.customerAccount.InquiryAccountRejected().subscribe(
      data => {
        const InquiryAccountRejected: any = data;
        this.RejectedInquiry = InquiryAccountRejected.details;
        this.RejectedInquiryCount = this.RejectedInquiry.length;
      },
      _error => {
      }
    );


  }


  tab(val): void {

    if (val === 'pending') {
        this.currenttab = 0;
        this.changeContent2();
      }

    if (val === 'approved') {
        this.currenttab = 1;
        this.changeContent2();
      }

    if (val === 'rejected') {
        this.currenttab = 2;
        this.changeContent2();
      }
  }
  changeContent2(): void {
    switch (this.currenttab) {
      case 0: {
        this.indextab = 'First-content';
        break;
      }
      case 1: {
        this.indextab = 'Second-content';
        break;
      }
      case 2: {
        this.indextab = 'third-content';
        break;
      }
      default: {
        this.indextab = 'error';
      }
    }
  }


  // tab(val): void {

  //   this.currenttab = val;
  //   switch (this.currenttab) {
  //     case 0: {
  //       this.indextab = 'First-content';
  //       break;
  //     }
  //     case 1: {
  //       this.indextab = 'Second-content';
  //       break;
  //     }
  //     case 2: {
  //       this.indextab = 'third-content';
  //       break;
  //     }
  //     case 3: {
  //       this.indextab = 'fourth-content';
  //       break;
  //     }
  //     default: {
  //       this.indextab = 'error';
  //     }
  //   }
  // }

  viewOpen(id): void {
    this.ngxService.startLoader('loader-01');
    this.viewVisible = true;
    this.approval.id = id;
    this.approval.approveOrReject = true;

    this.customerAccount.InquiryAccountOpening(id).subscribe(
      data => {
        const InquiryAccountOpening: any = data;
        this.inquiryAccountOp = InquiryAccountOpening.details;
        this.requestType = this.inquiryAccountOp.request_type;
        this.ngxService.stopLoader('loader-01');
      },
      _error => {
        this.loading = false;
      }
    );
  }


  viewClose(): void {
    this.viewVisible = false;
  }
  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }
onAction(val): void{
    if (val === 'approve'){
      this.approval.approveOrReject = true;
    }else{
      this.approval.approveOrReject = false;
    }
    console.log(this.approval);
  }

  open(val): void {
    this.visible = true;
    this.tabName = val;
  }

  close(): void {
    this.visible = false;
  }

  handleResponsedata(data, type){
    this.disabled = false;
    this.message.remove();

    this.responseCode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.resMessage = data.errorResponse;
    this.accountNumber = data.accountNumber;
    this.customerId = data.customerId;

    this.accountOpenings = data.details;

    if(type === 'Customer Creation'){
      if (this.isSuccess === false) {
        this.modal.error({
          nzTitle: 'Process failed',
          nzContent: this.resMessage
        });

      } else {
        this.modal.success({
          nzTitle: 'Operation Successfull',
          nzContent: 'Customer ID: ' + this.customerId,
        });
      }
    }else{
      if (this.isSuccess === false) {
        this.modal.error({
          nzTitle: 'Process failed',
          nzContent: this.resMessage
        });

      } else {
        this.modal.success({
          nzTitle: 'Operation Successfull',
          nzContent: 'Account Number: ' + this.accountNumber,
        });
      }
    }

    this.ngOnInit();

  }

  handleErrordata(error){
    this.disabled = false;
    this.message.remove();

    this.responseCode = error.error.responseCode;
    this.isSuccess = error.error.isSuccess;
    this.resMessage = error.error.errorResponse;
    this.accountNumber = error.error.accountNumber;
    this.customerId = error.error.customerId;

    if (this.isSuccess === false) {
      this.modal.error({
        nzTitle: 'Process failed',
        nzContent: this.resMessage
      });

    } else {
      this.modal.error({
        nzTitle: 'Process failed',
        nzContent: 'Something onusual went wrong',
      });
    }

  }

}
