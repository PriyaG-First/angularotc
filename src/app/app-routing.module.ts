import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventsComponent } from './addevents/addevents.component';
import { ViewEventComponent } from './view-event/view-event.component';

const routes: Routes = [{path:"",redirectTo:"login",pathMatch:"full"},
                      
                        {path:"dashboard",component:DashboardComponent},
                        {path:"login",component:LoginComponent},
                        {path:"createEvent",component:AddEventsComponent},
                        {path:"updateEvent/:eventId",component:AddEventsComponent},
                          {path:"viewEvent/:eventId",component:ViewEventComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
