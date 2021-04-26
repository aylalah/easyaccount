import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-manage-mandate',
  templateUrl: './manage-mandate.component.html',
  styleUrls: ['./manage-mandate.component.css']
})
export class ManageMandateComponent implements OnInit {

  listOfData: ItemData[] = [];
  visible = false;
  individualAccount: any;
  corporateAccount: any;
  current = 0;
  loading: boolean;
  index = 'First-content';
  batchNumber: string;
  rowId: number;
  pendindMandate: any;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private AccountMandate: AccountMandateService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
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

    this.index = 'First-content';
    this.loading = true;
    this.AccountMandate.PendindMandate().subscribe(
      data => {
        const PendindMandate: any = data;
        this.pendindMandate = PendindMandate.details;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
