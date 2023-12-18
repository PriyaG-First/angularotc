import { ChangeDetectorRef, NgModule, Renderer2, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddEventsComponent } from './addevents/addevents.component';

import { BodyStylingService } from './service/body-styling.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleModule } from '@ng-idle/core';
import { provideUserIdleConfig } from 'angular-user-idle';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEventsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgIdleModule.forRoot(),
    ModalModule.forRoot()
  
  ],
  providers: [Location,BodyStylingService,{provide:Renderer2,useExisting:RendererFactory2},NgIdleModule,provideUserIdleConfig({idle:6,timeout:6}),NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
