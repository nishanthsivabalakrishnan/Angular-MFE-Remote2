import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ManagementService } from 'src/app/Services/Management/management.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  @ViewChild('cancelButton') cancelButton:any;
  @ViewChild('closeButton') closeButton:any;
  id:any;
  allTasks:any;
  newTask:any;
  taskForm!: FormGroup;
  onGoingTask:any;
  completedTask:any;
  information:any;
  userId:any;
  currentTaskStatus:any;
  currentTaskId:any;
  constructor(private router: Router,private route: ActivatedRoute,private common : CommonService,
    private managementService:ManagementService,private notification:NotificationService,private formBuilder: FormBuilder,
    private authenticationservice:AuthenticationService) {  
    this.route.queryParams.subscribe(params => {
      this.id = this.common.decryptData(params['Id']);
      if(this.id){
        this.getTaskBoardDetails(this.id);
      }
  });
  this.information=this.authenticationservice.RetriveTokenInformation();
  this.userId=+this.information.UserId;
  this.taskForm = this.formBuilder.group({
    taskName: [null, Validators.required],
    taskDetails : [null, Validators.required],
  }); 
  }
  callback(){
    this.router.navigateByUrl('/management/userdetails');
  };
  getTaskBoardDetails(Id:any){
    this.managementService.GetTaskBoard(Id).subscribe((res)=>{
        this.allTasks=res;
        this.completedTask=res.filter((c:any)=>c.Status==3);     
        this.onGoingTask=res.filter((c:any)=>c.Status==2);     
        this.newTask=res.filter((c:any)=>c.Status==1);    
    },
    (err)=>{
      this.notification.FailureErrorNotification();
    })
  }
  submitForm(){
    this.taskForm.markAllAsTouched();
    if(this.taskForm.invalid){
      return;
    }   
    var dataToBackend={
      taskId:this.currentTaskId,
      taskStatus:this.currentTaskStatus,
      userId:this.id,
      taskName:this.taskForm.controls['taskName'].value,
      taskDetails:this.taskForm.controls['taskDetails'].value,
      assignedBy:this.userId
    }  
    this.managementService.PostTask(dataToBackend).subscribe((res)=>{      
      var decrypt = JSON.parse(res);
      var temp = JSON.parse(this.common.decryptData(decrypt.response));            
      if(temp.Status==1){
        this.notification.SuccessNotification(temp.Message);
        this.cancelButton.nativeElement.click();
        this.getTaskBoardDetails(this.id);
      }
      else{
        this.notification.ErrorNotification(temp.Message);
      }  
    },
    (err)=>{
      this.notification.FailureErrorNotification();
    }) 
  }
  onViewClick(data:any){
    this.currentTaskId=data.TaskId;
    this.currentTaskStatus=data.Status;
    this.taskForm.controls['taskName'].setValue(data.TaskName);
    this.taskForm.controls['taskDetails'].setValue(data.TaskDetails);
  }
  onDeleteClick(){
    this.managementService.DeleteTaskById(this.currentTaskId).subscribe((res)=>{
      var temp=JSON.parse(res);
      var decrypted=JSON.parse(this.common.decryptData(temp.response));
      this.notification.SuccessNotification(decrypted.Message);
      this.closeButton.nativeElement.click();
      this.getTaskBoardDetails(this.id);
    },
    (err)=>{
      this.notification.FailureErrorNotification();
    })
  }
  OnBack(){
    this.router.navigate(['/management/users']);
  }
  Logout(){
    if(this.authenticationservice.Logout())
    {
    this.notification.SuccessNotification("You have successfully logged out!");
    }
  }
}
