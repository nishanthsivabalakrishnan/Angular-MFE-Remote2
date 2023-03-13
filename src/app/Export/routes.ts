import { Routes } from '@angular/router';
import { AboutComponent } from '../Views/about/about.component';
import { AdminDashboardComponent } from '../Views/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from '../Views/contact-us/contact-us.component';
import { NotFoundComponent } from '../Views/not-found/not-found.component';
import { TaskBoardComponent } from '../Views/task-board/task-board.component';
import { TaskComponent } from '../Views/task/task.component';
import { UserDetailsComponent } from '../Views/user-details/user-details.component';
import { UserSettingsComponent } from '../Views/user-settings/user-settings.component';
import { UsersComponent } from '../Views/users/users.component';


export const Export_Routes: Routes = [
    {
      path: 'users',
      component : UsersComponent
    },
    {
      path: 'admin-dashboard',
      component : AdminDashboardComponent
    },
    {
      path: 'edituser',
      component : UserSettingsComponent
    },
    {
      path:'userdetails',
      component : UserDetailsComponent
    },
    {
      path:'about',
      component: AboutComponent
    },
    {
      path:'contact-us',
      component:ContactUsComponent
    },
    {
      path:'task',
      component:TaskComponent
    },
    {
      path:'task-board',
      component:TaskBoardComponent
    },
    {
      path: '**',
      component:NotFoundComponent
    },
];