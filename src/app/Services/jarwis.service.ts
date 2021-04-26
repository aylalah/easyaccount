import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

    private baseUrl = environment.baseUrl;
    private baseUrl2 = environment.baseUrl2;
    private verssion = environment.verssion;
    private login2 = environment.login;
    private commonAPI = environment.commonAPI;

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(this.baseUrl + 'signup' , data)
  }
  // login(data) {
  //   return this.http.post(this.baseUrl + 'login', data);
  // }

  login(data) {
    return this.http.post(this.login2, data)
  }

  refreshToken() {
    return this.http.get(this.baseUrl + this.verssion + 'session/refresh-token', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getRoles() {
    return this.http.get(this.baseUrl + this.verssion + 'users/getRoles', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getEmployeeId(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'GetEmployeeDetails?employeeId=' + id, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getUserADDetails(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + 'getUserADDetails/' + id, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  createUser(data) {
    return this.http.post( this.baseUrl + this.verssion + 'users/create' , data , {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  verifyUser(data){
    return this.http.post(this.baseUrl + this.verssion + 'users/verify', data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  profile() {
    return this.http.get(this.baseUrl + 'me', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  }

  myProfile() {
    return this.http.get(this.baseUrl + this.verssion + 'session/authenticated-user', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  verifyUsers(data) {
    return this.http.post(this.baseUrl + this.verssion + 'users/verify', data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  deleteUsers(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + 'delete?UserId=' + id, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  users() {
    return this.http.get(this.baseUrl + this.verssion + 'users', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getUser(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + id + '/edit', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  updateUser(id: string, data) {
    return this.http.post(this.baseUrl + this.verssion + 'users/' + id + '/edit', data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  usersPending() {
    return this.http.get(this.baseUrl + this.verssion + 'users/pending', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // Common api

  validCodesSectors() {
    return this.http.get(this.baseUrl + this.verssion + 'SubSectorCodes', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validCodesSubSectors() {
    return this.http.get(this.baseUrl + this.verssion + 'SectorCodes', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validCodesSegments() {
    return this.http.get(this.baseUrl + this.verssion + 'SegmentCodes', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validCodesSubSegments() {
    return this.http.get(this.baseUrl + this.verssion + 'SubSegmentCodes', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validCodesStates() {
    return this.http.get(this.baseUrl + this.verssion + 'States', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validCodesCities() {
    return this.http.get(this.baseUrl + this.verssion + 'LocalGovernment', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // Document API

  DocumentTypes() {
    return this.http.get(this.baseUrl + this.verssion + 'DocumentTypes', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  DocumentCodes(id) {
    return this.http.get(this.baseUrl + this.verssion + 'DocumentCodes?documentTypeCode=' + id, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }
}
