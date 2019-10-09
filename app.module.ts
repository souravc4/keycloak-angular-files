import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule}    from '@angular/common/http';
import { FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from './core/guard/auth-guard.service';
import { KeycloakService } from './core/auth/keycloak.service';

import { CustomerViewComponent } from './components/customer-view/customer-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerOrderDetailComponent } from './components/customer-order-detail/customer-order-detail.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerViewComponent,
    OrderViewComponent,
    HomeComponent,
    CustomerOrderDetailComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    KeycloakService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
