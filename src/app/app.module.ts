import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import the AccumulationChartModule for the AccumulationChart component
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import en from '@angular/common/locales/en';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { UsersAuthorizeComponent } from './pages/users/users-authorize/users-authorize.component';
import { NewCustomerComponent } from './pages/customer-account/individual/new-customer/new-customer.component';
import { IndividualComponent } from './pages/customer-account/individual/individual/individual.component';
import { CorporateComponent } from './pages/customer-account/corporate/corporate.component';
import { CorpNewCustomerComponent } from './pages/customer-account/corporate/corp-new-customer/corp-new-customer.component';
import { CorpExistingCustomerComponent } from './pages/customer-account/corporate/corp-existing-customer/corp-existing-customer.component';

import { NewBvnComponent } from './pages/customer-account/individual/new-customer/new-bvn/new-bvn.component';
import { NewWobvnComponent } from './pages/customer-account/individual/new-customer/new-wobvn/new-wobvn.component';
import { NewMinorComponent } from './pages/customer-account/individual/new-customer/new-minor/new-minor.component';
import { NewBulkComponent } from './pages/customer-account/individual/new-customer/new-bulk/new-bulk.component';
import { NewSignatureComponent } from './pages/customer-account/individual/new-customer/new-signature/new-signature.component';
import { BulkAccountComponent } from './pages/customer-account/bulk/bulk-account/bulk-account.component';
import { PreGeneratedComponent } from './pages/customer-account/bulk/pre-generated/pre-generated.component';
import { BatchMunbersComponent } from './pages/customer-account/bulk/batch-munbers/batch-munbers.component';
import { NewNormalComponent } from './pages/customer-account/individual/new-customer/new-normal/new-normal.component';
import { AuthorizeIndividualComponent } from './pages/customer-account/authorize/authorize-individual/authorize-individual.component';
import { AddMandateComponent } from './pages/account-mandate/add-mandate/add-mandate.component';
import { ManageMandateComponent } from './pages/account-mandate/manage-mandate/manage-mandate.component';
import { ProcessAccountComponent } from './pages/customer-account/process/process-account/process-account.component';
import { SingleAccountComponent } from './pages/alert-update/single-account/single-account.component';
import { FileUploadComponent } from './pages/alert-update/file-upload/file-upload.component';


registerLocaleData(en);
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    AllUsersComponent,
    UsersAuthorizeComponent,
    RequestResetComponent,
    ResponseResetComponent,
    NewCustomerComponent,
    IndividualComponent,
    CorporateComponent,
    NewBvnComponent,
    NewWobvnComponent,
    NewMinorComponent,
    NewBulkComponent,
    PreGeneratedComponent,
    BulkAccountComponent,
    BatchMunbersComponent,
    NewSignatureComponent,
    CorpNewCustomerComponent,
    CorpExistingCustomerComponent,
    NewNormalComponent,
    AddMandateComponent,
    ManageMandateComponent,
    AuthorizeIndividualComponent,
    ProcessAccountComponent,
    SingleAccountComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IconsProviderModule,

    //Syncfussion design;
    AccumulationChartModule,
    GridModule,

    // Loader;
    NgxUiLoaderModule,

    //Ants JS;
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    NzTabsModule,
    NzTableModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputModule,
    NzStepsModule,
    NzListModule,
    NzResultModule,
    NzGridModule,
    NzUploadModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzBadgeModule,
    NzToolTipModule,
    NzTagModule,
    NzAffixModule,
    NzDropDownModule,
    NzModalModule,
    NzCheckboxModule,
    NzDescriptionsModule,
    NzDividerModule,
    BrowserAnimationsModule
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,

    PageService,
    SortService,
    FilterService,
    GroupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
