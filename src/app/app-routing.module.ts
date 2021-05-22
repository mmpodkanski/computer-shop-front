import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CustomerBoardComponent } from './components/customer-board/customer-board.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { PaymentFailedComponent } from './components/payment-failed/payment-failed.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'products',component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'admin/add-product', component: ProductAddComponent },
  { path: 'cart', component: CartComponent},
  { path: 'orders/:id', component: OrderViewComponent},
  { path: 'customer', component: CustomerBoardComponent},
  { path: 'payment/success', component: PaymentSuccessComponent},
  { path: 'payment/failed', component: PaymentFailedComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ProductListComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
