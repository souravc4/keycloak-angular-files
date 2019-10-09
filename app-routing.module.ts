import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './core/guard/auth-guard.service';

import { CustomerViewComponent} from "./components/customer-view/customer-view.component";
import { OrderViewComponent} from "./components/order-view/order-view.component";
import { HomeComponent} from "./components/home/home.component";
import { CustomerOrderDetailComponent } from "./components/customer-order-detail/customer-order-detail.component";
import { CreateCustomerComponent } from "./components/create-customer/create-customer.component";
import { UpdateCustomerComponent } from "./components/update-customer/update-customer.component"

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'customer', component: CustomerViewComponent},
  { path: 'order', component: OrderViewComponent},
  { path: 'customer/:id', component: CustomerOrderDetailComponent},
  { path: 'createcustomer', canActivate: [AuthGuard], component: CreateCustomerComponent},
  { path: 'updatecustomer/:id', component: UpdateCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
