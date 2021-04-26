import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AfterLoginService } from './Services/after-login.service';
import { BeforeLoginService } from './Services/before-login.service';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { UsersAuthorizeComponent } from './pages/users/users-authorize/users-authorize.component';
import { NewNormalComponent } from './pages/customer-account/individual/new-customer/new-normal/new-normal.component';
import { AuthorizeIndividualComponent } from './pages/customer-account/authorize/authorize-individual/authorize-individual.component';
import { AddMandateComponent } from './pages/account-mandate/add-mandate/add-mandate.component';
import { ManageMandateComponent } from './pages/account-mandate/manage-mandate/manage-mandate.component';

// CUSTOMER ACCOUNT OPPENING;
import { NewCustomerComponent } from './pages/customer-account/individual/new-customer/new-customer.component';
import { IndividualComponent } from './pages/customer-account/individual/individual/individual.component';
import { CorporateComponent } from './pages/customer-account/corporate/corporate.component';
import { CorpNewCustomerComponent } from './pages/customer-account/corporate/corp-new-customer/corp-new-customer.component';
import { CorpExistingCustomerComponent } from './pages/customer-account/corporate/corp-existing-customer/corp-existing-customer.component';

// CUSTOMER ACCOUNT OPPENING
import { BulkAccountComponent } from './pages/customer-account/bulk/bulk-account/bulk-account.component';
import { PreGeneratedComponent } from './pages/customer-account/bulk/pre-generated/pre-generated.component';

import { NewBvnComponent } from './pages/customer-account/individual/new-customer/new-bvn/new-bvn.component';
import { NewWobvnComponent } from './pages/customer-account/individual/new-customer/new-wobvn/new-wobvn.component';
import { NewMinorComponent } from './pages/customer-account/individual/new-customer/new-minor/new-minor.component';
import { NewBulkComponent } from './pages/customer-account/individual/new-customer/new-bulk/new-bulk.component';
import { BatchMunbersComponent } from './pages/customer-account/bulk/batch-munbers/batch-munbers.component';
import { NewSignatureComponent } from './pages/customer-account/individual/new-customer/new-signature/new-signature.component';
import { ProcessAccountComponent } from './pages/customer-account/process/process-account/process-account.component';

// Alert Update
import { SingleAccountComponent } from './pages/alert-update/single-account/single-account.component';
import { FileUploadComponent } from './pages/alert-update/file-upload/file-upload.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  },
  // {
  //   path : 'login',
  //   component : LoginComponent ,
  //   canActivate : [BeforeLoginService]
  // },
  {
    path : 'signup',
    component : SignupComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AfterLoginService]
  },

  // USERS
  {
    path : 'users',
    component : AllUsersComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'authorize-users',
    component : UsersAuthorizeComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AfterLoginService]
  },

  {
    path : 'request-password-reset',
    component : RequestResetComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'response-password-reset',
    component : ResponseResetComponent,
    canActivate : [AfterLoginService]
  },

  {
    path : 'completed-process',
    component : ProcessAccountComponent,
    canActivate : [AfterLoginService]
  },

  {
    path : 'account-opening-authorization',
    component : AuthorizeIndividualComponent,
    canActivate : [AfterLoginService]
  },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },

  // CUSTOMER ACCOUNT OPENING;

  {path: 'new-customer', component: NewCustomerComponent, canActivate : [AfterLoginService] },
  {
    path : 'indevidual/:id', component : IndividualComponent, canActivate : [AfterLoginService],
    children: [
              {path: 'new-bvn', component: NewBvnComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
              {path: 'new-wobvn', component: NewWobvnComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
              {path: 'new-minor', component: NewMinorComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
              {path: 'new-bulk', component: NewBulkComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
              {path: 'new-normal', component: NewNormalComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
              {path: 'new-signature', component: NewSignatureComponent, outlet: 'Savings', canActivate : [AfterLoginService] },
    ]
  },
  {
    path : 'corporate/:id', component : CorporateComponent, canActivate : [AfterLoginService],
    children: [
              {path: 'new-corporate', component: CorpNewCustomerComponent, outlet: 'corporate', canActivate : [AfterLoginService] },
      // tslint:disable-next-line:max-line-length
              {path: 'existing-corporate', component: CorpExistingCustomerComponent, outlet: 'corporate', canActivate : [AfterLoginService] },
    ]
  },


  // ACCOUNT BULK;
{
  path : 'bulk-account',
  component : BulkAccountComponent,
  canActivate : [AfterLoginService]
},
{
  path : 'pre-generated',
  component : PreGeneratedComponent,
  canActivate : [AfterLoginService]
},

{
  path : 'batch-details/:id',
  component : BatchMunbersComponent,
  canActivate : [AfterLoginService]
},

  // ACCOUNT MANDATE

  {
    path : 'add-mandate',
    component : AddMandateComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'manage-mandate',
    component : ManageMandateComponent,
    canActivate : [AfterLoginService]
  },

   // ALERT UPDATE

   {
    path : 'single-account',
    component : SingleAccountComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'file-upload',
    component : FileUploadComponent,
    canActivate : [AfterLoginService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

