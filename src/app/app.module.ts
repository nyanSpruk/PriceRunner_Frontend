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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemComponent,
    ColumnsComponent,
    ColumnComponent,
    CreateItemComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
