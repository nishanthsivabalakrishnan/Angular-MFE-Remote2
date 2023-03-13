import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ManagementService } from 'src/app/Services/Management/management.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild('cancelButton') cancelButton:any;
  userId:any;
  information:any;
  teamList:any;
  addTaskForm!: FormGroup;
  assignedTo:any;
  constructor(private router: Router,private managementService:ManagementService,private authenticationservice:AuthenticationService,
    private notificationService:NotificationService,private formBuilder: FormBuilder,private common : CommonService) { 
    this.information=this.authenticationservice.RetriveTokenInformation();
    this.userId=+this.information.UserId;
    if(this.userId){
      this.getTeamList(this.userId);
    }
    this.addTaskForm = this.formBuilder.group({
      taskName: [null, Validators.required],
      taskDetails : [null, Validators.required],
    });  
  }
  callback(){
    this.router.navigateByUrl('/management/userdetails');
    // this.router.navigate(['/management/userdetails'], { queryParams: { Id: '1',role:'1' } });
  };
  getTeamList(userId:any){
    this.managementService.GetTeamList(userId).subscribe((res)=>{
      this.teamList=res;      
    },(err)=>{
      this.notificationService.FailureErrorNotification();  
    })
  }
  submitForm(){
    this.addTaskForm.markAllAsTouched();
    if(this.addTaskForm.invalid){
      return;
    }   
    var dataToBackend={
      taskId:0,
      taskStatus:1,
      userId:this.assignedTo,
      taskName:this.addTaskForm.controls['taskName'].value,
      taskDetails:this.addTaskForm.controls['taskDetails'].value,
      assignedBy:this.userId
    }  
    this.managementService.PostTask(dataToBackend).subscribe((res)=>{      
      var decrypt = JSON.parse(res);
      var temp = JSON.parse(this.common.decryptData(decrypt.response));            
      if(temp.Status==1){
        this.notificationService.SuccessNotification(temp.Message);
        this.cancelButton.nativeElement.click();
      }
      else{
        this.notificationService.ErrorNotification(temp.Message);
      }  
    },
    (err)=>{
      this.notificationService.FailureErrorNotification();
    }) 
  }
  navigateToTaskBoard(id:any){
    this.router.navigate(['/management/task-board'], { queryParams: { Id: this.common.encryptData(id,true) } });
  }
  Logout(){
    if(this.authenticationservice.Logout())
    {
    this.notificationService.SuccessNotification("You have successfully logged out!");
    }
  }
}
