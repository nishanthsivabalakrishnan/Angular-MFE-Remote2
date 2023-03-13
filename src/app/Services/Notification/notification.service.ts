import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toaster:ToastrService) { }
  SuccessNotification(message:string){
    this.toaster.success(message);
  }
  ErrorNotification(message:string){
    this.toaster.error(message);
  }
  WarningNotification(message:string){
    this.toaster.warning(message);
  }
  FailureErrorNotification(){
    this.toaster.error("Unexpected error occured. Please contact admin");
  }
}
