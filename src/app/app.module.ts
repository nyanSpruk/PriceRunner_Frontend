import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './components/item/item.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { ColumnComponent } from './components/columns/column/column.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateItemComponent } from './screens/create-item/create-item.component';
import { CartComponent } from './screens/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './screens/user/login/login.component';
import { ProductsComponent } from './screens/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemComponent,
    ColumnsComponent,
    ColumnComponent,
    CreateItemComponent,
    CartComponent,
    LoginComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
