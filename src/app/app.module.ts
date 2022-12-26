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
import {
  EditModal,
  ProductModal,
  ProductsComponent,
} from './screens/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    EditModal,
    ProductModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
