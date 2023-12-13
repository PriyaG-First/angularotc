import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventsComponent } from './addevents/addevents.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [{path:"",redirectTo:"login",pathMatch:"full"},
                      
                        {path:"dashboard",component:DashboardComponent,canActivate:[authGuard]},
                        {path:"login",component:LoginComponent},
                        {path:"createEvent",component:AddEventsComponent,canActivate:[authGuard]},
                        {path:"updateEvent/:eventId",component:AddEventsComponent,canActivate:[authGuard]},
                          {path:"viewEvent/:eventId",component:ViewEventComponent,canActivate:[authGuard]}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
