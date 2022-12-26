import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Category } from 'src/app/classes/category';
import { Item } from 'src/app/classes/item';
import { ProductStore } from 'src/app/classes/product-store';
import { CategoryService } from 'src/app/services/category.service';
import { ProductStorePriceService } from 'src/app/services/product-store-price.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  izdelki: Item[] = [];
  constructor(
    private productService: ProductService,
    private productStoreS: ProductStorePriceService,
    public dialog: MatDialog
  ) {}

  izdelkiStores: any = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      data.forEach((element) => {
        this.izdelki.push(element);
        this.productStoreS
          .getStoresForProduct(element.id!)
          .subscribe((data) => {
            // console.log(data);
            this.izdelkiStores.push(data);
            console.log(this.izdelkiStores);
          });
      });
    });
  }

  openProductModal(izdelek: Item) {
    const dialogRef = this.dialog.open(ProductModal, {
      // width: '250px',
      height: '250px',
      data: izdelek,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditModal(izdelek: Item) {
    const dialogRef = this.dialog.open(EditModal, {
      width: '500px',
      // height: '250px',
      data: izdelek,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductModal {
  constructor(
    public dialogRef: MatDialogRef<ProductModal>,
    @Inject(MAT_DIALOG_DATA) public product: Item,
    private productStoreSerivce: ProductStorePriceService
  ) {}
  public stores: ProductStore[] = [];

  ngOnInit(): void {
    this.productStoreSerivce
      .getStoresForProduct(this.product.id!)
      .subscribe((data) => {
        // Remap the data
        data.forEach((element) => {
          console.log(element);
          let productStore = {
            id: element[0],
            name: element[1],
            price: element[2],
          };
          this.stores.push(productStore);
        });
        console.log(this.stores);
      });
  }
}

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.html',
  styleUrls: ['./products.component.scss'],
})
export class EditModal {
  constructor(
    public dialogRef: MatDialogRef<EditModal>,
    @Inject(MAT_DIALOG_DATA) public product: Item,
    private categoryService: CategoryService,
    private productStoreSerivce: ProductStorePriceService
  ) {}

  isInputValid: boolean = false;
  public categories: Category[] = [];

  public stores: ProductStore[] = [];

  submitForm() {
    if (this.isInputValid) {
      console.log(this.product);
      console.log(this.stores);
      // this.productService.updateProduct(this.product).subscribe((data) => {
      //   console.log(data);
      // });
    }
  }

  addStore() {
    // TODO Add functionality to add a store
    console.log('Add store');
  }

  removeStore(store: ProductStore) {
    // TODO Add functionality to remove a store
    console.log('Remove store');
  }

  validateInputFields() {
    this.isInputValid =
      this.product.name != '' &&
      this.product.price != 0 &&
      this.product.description != '';

    console.log(this.isInputValid);
  }

  ngOnInit(): void {
    console.log(this.product);
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      data.forEach((element) => {
        this.categories.push(element);
      });
    });

    this.productStoreSerivce
      .getStoresForProduct(this.product.id!)
      .subscribe((data) => {
        // Remap the data
        data.forEach((element) => {
          console.log(element);
          let productStore = {
            id: element[0],
            name: element[1],
            price: element[2],
          };
          this.stores.push(productStore);
        });
        console.log(this.stores);
      });

    this.validateInputFields();
  }
}
