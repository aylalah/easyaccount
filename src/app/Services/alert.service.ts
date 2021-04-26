import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

  constructor(private http: HttpClient) { }

// Alert Profile

AlertsProfile(data){
    return this.http.post(this.baseUrl + this.verssion + 'Alerts/ProfileNew', data, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
  }

GetAccountAlertDetails(accountNumber: string){
  return this.http.get(this.baseUrl + this.verssion + `Alerts/GetAccountAlertDetails?accountNumber=${accountNumber}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  DeleteAlertDetails(data){
  return this.http.post(this.baseUrl + this.verssion + `Alerts/DeleteAlertDetails`, data,{headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  ProfileAlertUpload(data){
    return this.http.post(this.baseUrl + this.verssion + `Alerts/ProfileAlertUpload`, data,{headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }

}
