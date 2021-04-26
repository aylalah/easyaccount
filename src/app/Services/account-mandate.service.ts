import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountMandateService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

  constructor(private http: HttpClient) { }

// CREATE MANDATE

  CreateMandate(data){
    return this.http.post(this.baseUrl + this.verssion + 'Mandate/Add', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  CreateBulkMandate(data){
    return this.http.post(this.baseUrl + this.verssion + 'inputter/BulkMandate/Add', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

// PENDING MANDATE
  PendindMandate() {
    return this.http.get(this.baseUrl + this.verssion + 'BulkMandate/Add/pendingAuthorization', {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

  // APPROVE MANDATE
  AuthorizeMandate(data) {
    return this.http.post(this.baseUrl + this.verssion + 'authorizer/AccountMandate', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }
}
