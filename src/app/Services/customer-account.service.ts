import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

constructor(private http: HttpClient) { }

// BVN VALIDATION
BvnValidation(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Bvn?bvn=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

customerInquiry(id: string, ct: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Customer?customerId=' + id + '&customerType='+ ct, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// CREATE CUSTOMER

CreateCustomer(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/CreateCustomer', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

CreateCustomerCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/CreateCustomer/Corporate', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

AccountOpeningCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Corporate', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

allPendingCorporate() {
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Corporate/pendingAuthorization', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

CorporateAccountRejected(){
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CorporateAccount/Rejected', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

InquiryCorporateDetails(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CorporateAccount/Opening?id=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

InquiryCompletedProcess() {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CompletedProcess', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

InquiryAccountRejected() {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account/Rejected', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// SCHEME TYPE
SchemeTypes() {
  return this.http.get(this.baseUrl + this.verssion + 'SchemeTypes', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

SchemeCodes(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'SchemeCodes?schemeType=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// GlSubHeadCode

GlSubHeadCode(id: string) {

  return this.http.get(this.baseUrl + this.verssion + 'GlSubHeadCodes?schemeCode=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

  // GET Sols
    getSols() {
  return this.http.get(this.baseUrl + this.verssion + 'Sols', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getRmCode(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'GetRmDetails?rmCode=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

InquiryAccountOpening(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account/Opening?id=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

AccountInquiry(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account?accountNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// PRE GENERATE

PREGeneration(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Pre-Generation', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// UPLOAD BULK

BulkAccountOpeningSavingsCurrent(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Bulk/SavingsCurrent', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

BulkAccountOpeningCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Bulk/Corporate', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

BulkAccountOpening(data){

  console.log(data);
  return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Bulk/Retail', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

BulkCustomer(data){
  return this.http.post(this.baseUrl + this.verssion + 'Customer/Bulk/Update', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

BulkAccountUpdate(data){
  return this.http.post(this.baseUrl + this.verssion + 'Account/Bulk/Update', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// UPLOAD BULK Informations

getBatchRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=retail', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

  currentsavings(){
    return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=currentsavings', {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

getBatchCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=corporate', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchPregeneratedCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=pregeneratedCorporate', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchPregeneratedRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=pregeneratedRetail', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchCustomerUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=customerUpdate', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getCustomerAccountUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=customeraccountupdate', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}


// Bulk Type Details

getBatchDCustomerUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=customerupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getCustomerAcountUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=customeraccountupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}


getBatchDRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=retail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchDCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=corporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchDPregeneratedCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=pregeneratedCorporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

getBatchDPregeneratedRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=pregeneratedRetail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// AccountOpeningMinor

AccountMinor(data){
  return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Minor', data, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

  OpeningAccountJoint(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Joint', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  OpeningAccountNormal(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Normal', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  // Authorize Account


IndividualAccountPendAuth(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/pendingAuthorization', {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

  IndividualApproveSingles(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/AccountOpening/Single', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  IndividualApproveBulk(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  CorporateAccountPendAuth(){
    return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Corporate/pendingAuthorization', {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  CorporateApproveSingle(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/AccountOpening/Corporate/Single', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  CorporateApproveBulk(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  // Endpoint for single accounts opening (joint, normal, minor) that have been authorized;

  AccountOpeningAuthorized(){
      return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Authorized', {headers: {
          Authorization: `Bearer ${localStorage.token}`
        }});
    }



}
