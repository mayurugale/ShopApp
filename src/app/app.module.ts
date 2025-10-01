import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { DailogComponent } from './dailog/dailog.component';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ShopListComponent } from './admin/shop-list/shop-list.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { BillingComponent } from './user/billing/billing.component';
import { ItemsComponent } from './user/items/items.component';
import { CustomerListComponent } from './user/customers/customer-list/customer-list.component';





@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerdetailsComponent,
    DailogComponent,
    LoginComponent,
    NotfoundComponent,
    ConfirmDialogComponent,
    ShopListComponent,
    UserManagementComponent,
    BillingComponent,
    ItemsComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule
   ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
