import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ManagementService } from 'src/app/Services/Management/management.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('cancelButton') cancelButton:any;
  roles:any;
  allUsers:any;
  addUserForm!: FormGroup;
  emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  reportsTo:any;
  userId:any;
  constructor(private authService:AuthenticationService,private notificationService:NotificationService,private common:CommonService,
    private formBuilder: FormBuilder,private managementService:ManagementService,private authenticationService:AuthenticationService){
      this.addUserForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
        role: [null, Validators.required],
        firstName : [null, Validators.required],
        lastName : [null, Validators.required],
        reportsTo : [null, Validators.required]
      });
      this.getAllUserRoles();
      this.getAllUsers();      
  }
  getAllUserRoles(){
    this.authService.GetAllRoles().subscribe((res)=>{
      this.roles=res;
    },(err)=>{
      this.notificationService.FailureErrorNotification();
    });
  }
  getAllUsers(){
    this.managementService.GetAllUsers().subscribe((res)=>{
      this.allUsers=res;
    },(err)=>{
      this.notificationService.FailureErrorNotification();
    })
  }
  roleSelection(id:any){
    this.managementService.GetReportingPersons(id.toString()).subscribe((res)=>{
      this.reportsTo=res;   
    },(err)=>{
      this.notificationService.FailureErrorNotification();
    })   
  }
  submitAddUserForm(){
    this.addUserForm.markAllAsTouched();

    if(this.addUserForm.invalid){
      return;
    }
    var dataToBackend={
      userId:this.userId,
      email: this.addUserForm.controls['email'].value,
      role: +this.addUserForm.controls['role'].value,
      firstName : this.addUserForm.controls['firstName'].value,
      lastName : this.addUserForm.controls['lastName'].value,
      reportsTo : this.addUserForm.controls['reportsTo'].value
    }
    this.authService.AdminRegisterNewUser(dataToBackend).subscribe((res)=>{
      var temp = JSON.parse(this.common.decryptData(res));
      if(temp.Status==1){
        this.notificationService.SuccessNotification(temp.Message);
        this.closebutton.nativeElement.click();
        this.addUserForm.reset();
        this.getAllUsers();
      }
      else{
        this.notificationService.ErrorNotification(temp.Message);
      }
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    })
  }

  get Validator() {
    return this.addUserForm;
  }

  editUser(id:any){
    this.userId=id;    
    this.managementService.GetUserDetailsById(id).subscribe((res)=>{
      this.reportsTo=res.ReportingList;
      this.addUserForm.controls['firstName'].setValue(res.UserDetails.FirstName);
      this.addUserForm.controls['lastName'].setValue(res.UserDetails.LastName);
      this.addUserForm.controls['email'].setValue(res.UserDetails.Email);
      this.addUserForm.controls['role'].setValue(res.UserDetails.Role);
      this.addUserForm.controls['reportsTo'].setValue(res.UserDetails.ReportsTo);
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    })    
  }
  removeUser(){
    this.authService.RemoveUser(this.userId.toString()).subscribe((res)=>{
      var temp = JSON.parse(this.common.decryptData(res));
      if(temp.Status==1){
        this.notificationService.SuccessNotification(temp.Message);
        this.cancelButton.nativeElement.click();
        this.getAllUsers();
      }
      else{
        this.notificationService.ErrorNotification(temp.Message);
      }    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    })
  }
  Logout(){
    if(this.authenticationService.Logout())
    {
    this.notificationService.SuccessNotification("You have successfully logged out!");
    }
  }
  ResendActivationMail(mailId:string){
    var temp={
      email:mailId
    }
    this.authService.ResendActivationMail(temp).subscribe((res)=>{
      var temp = JSON.parse(this.common.decryptData(res));
      if(temp.Status==4){
        this.notificationService.SuccessNotification(temp.Message);
      }
      else{
        this.notificationService.ErrorNotification(temp.Message);
      } 
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    })
  }
}
