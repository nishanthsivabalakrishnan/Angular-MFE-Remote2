import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient,private commonservice : CommonService) {   }

  GetAllUsers(){
    return this.http.get<any>(environment.BaseURI + 'Management/GetAllUsers').pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    );  
  }
  GetReportingPersons(data:any){
    return this.http.get<any>(environment.BaseURI + 'Management/GetAllReportingMaster?Id='+this.commonservice.encryptData(data,true)).pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    ); 
  }
  GetUserDetailsById(data:any){
    return this.http.get<any>(environment.BaseURI + 'Management/GetUserById?Id='+this.commonservice.encryptData(data,true)).pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    ); 
  }

  GetTeamList(data:any){
    return this.http.get<any>(environment.BaseURI + 'Management/GetTeamList?Id='+this.commonservice.encryptData(data,true)).pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    ); 
  }
  PostTask(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Management/PostTask',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  GetTaskBoard(data:any){
    return this.http.get<any>(environment.BaseURI + 'Management/GetTaskBoard?Id='+this.commonservice.encryptData(data,true)).pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    ); 
  }
  DeleteTaskById(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Management/DeleteTaskById',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  ChangeTaskStatus(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Management/ChangetaskStatus',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  PostUserDetails(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Management/PostUserDetails',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  GetUserDetails(data:any){
    return this.http.get<any>(environment.BaseURI + 'Management/GetUserDetailsById?Id='+this.commonservice.encryptData(data,true)).pipe(
      map( (response: any) => {
        return JSON.parse(this.commonservice.decryptData(response.response));
      })
    ); 
  }
}
