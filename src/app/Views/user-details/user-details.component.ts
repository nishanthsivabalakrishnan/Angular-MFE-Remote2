import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/DTO/DtoUserDetails';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ManagementService } from 'src/app/Services/Management/management.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  formValue!:FormGroup;
  userDetailsObj:UserDetails= new UserDetails();
  userName:string="User";
  userDetails:any;
  isFormSubmitted:boolean=false;
  userId:any;
  constructor(private router: Router,private formBuilder:FormBuilder,private authenticationService:AuthenticationService,private managementService:ManagementService,
    private common:CommonService,private notificationService:NotificationService) {
    this.userDetails=this.authenticationService.RetriveTokenInformation();
    if(this.userDetails){
      this.userName=this.userDetails.Name;
      this.userId=this.userDetails.UserId;
      this.GetUserDetails();
    }    
  }
  ngOnInit(): void {
    this.formValue=new FormGroup({
      FirstName:new FormControl('',[Validators.required]),
      LastName:new FormControl('',[Validators.required]),
      Email:new FormControl('',[Validators.required]),
      DateOfBirth:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required]),
      City:new FormControl('',[Validators.required]),
      Country:new FormControl('',[Validators.required]),
      PostalCode:new FormControl('',[Validators.required]),
      CollegeName:new FormControl('',[Validators.required]),
      Percentage:new FormControl('',[Validators.required]),
      Designation:new FormControl('',[Validators.required]),
      WorkLocation:new FormControl('',[Validators.required]),
      About:new FormControl('',[Validators.required])
    });
  }
  get formControls(): any {
    return this.formValue.controls;
  }
  saveForm(){
    this.isFormSubmitted=true;
    this.formValue.markAllAsTouched();
    this.userDetailsObj.firstName=this.formValue.value.FirstName;
    this.userDetailsObj.lastName=this.formValue.value.LastName;
    this.userDetailsObj.email=this.formValue.value.Email;
    this.userDetailsObj.dateOfBirth=this.formValue.value.DateOfBirth;
    this.userDetailsObj.address=this.formValue.value.Address;
    this.userDetailsObj.city=this.formValue.value.City;
    this.userDetailsObj.country=this.formValue.value.Country;
    this.userDetailsObj.postalCode=this.formValue.value.PostalCode;
    this.userDetailsObj.collegeName=this.formValue.value.CollegeName;
    this.userDetailsObj.percentage=this.formValue.value.Percentage;
    this.userDetailsObj.designation=this.formValue.value.Designation;
    this.userDetailsObj.workLocation=this.formValue.value.WorkLocation;
    this.userDetailsObj.about=this.formValue.value.About;
    this.userDetailsObj.userId=+this.userId;
    if(this.formValue.invalid){
      return;
    }
    this.managementService.PostUserDetails(this.userDetailsObj).subscribe((res)=>{
      var decrypt = JSON.parse(res);
      var temp = JSON.parse(this.common.decryptData(decrypt.response));            
      if(temp.Status==1){
        this.notificationService.SuccessNotification(temp.Message);
        this.GetUserDetails();
      }
      else{
        this.notificationService.ErrorNotification(temp.Message);
      }  
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    }) 
  }
  GetUserDetails(){
    this.managementService.GetUserDetails(this.userId).subscribe((res)=>{
      var userDetails=res;
      this.formValue.patchValue(userDetails);
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    })
  }
  OnBack(){
    this.router.navigate(['/management/users']);
  }
}
