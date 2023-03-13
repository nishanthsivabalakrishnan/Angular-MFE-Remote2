import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ManagementService } from 'src/app/Services/Management/management.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  id:any;
  information:any;
  userId:any;
  allTasks:any;
  completedTask:any;
  onGoingTask:any;
  newTask:any;
  constructor(private router: Router,private route: ActivatedRoute,private common : CommonService,private authenticationservice:AuthenticationService,
    private managementService:ManagementService,private notification:NotificationService) {  
    this.information=this.authenticationservice.RetriveTokenInformation();
    this.userId=+this.information.UserId;
    this.getTaskBoardDetails(this.userId);  
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

  ChangeTaskStatus(taskId:any,status:any){
    var dataToBackend={
      taskId:+taskId,
      taskStatus:+status
    }
    this.managementService.ChangeTaskStatus(dataToBackend).subscribe((res)=>{
      var temp=JSON.parse(res);
      var decrypted=JSON.parse(this.common.decryptData(temp.response));
      this.notification.SuccessNotification(decrypted.Message);
      this.getTaskBoardDetails(this.userId);    
    },(err)=>{
      this.notification.FailureErrorNotification();
    })
  }
  Logout(){
    if(this.authenticationservice.Logout())
    {
    this.notification.SuccessNotification("You have successfully logged out!");
    }
  }
}
