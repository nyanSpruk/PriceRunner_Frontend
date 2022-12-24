import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './screens/cart/cart.component';
import { CreateItemComponent } from './screens/create-item/create-item.component';
import { ProductsComponent } from './screens/products/products.component';
import { LoginComponent } from './screens/user/login/login.component';

// Change '' to redirect to products page
const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
