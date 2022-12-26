import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Category } from 'src/app/classes/category';
import { Item } from 'src/app/classes/item';
import { ProductStore } from 'src/app/classes/product-store';
import { Store } from 'src/app/classes/store';
import { CategoryService } from 'src/app/services/category.service';
import { ProductStorePriceService } from 'src/app/services/product-store-price.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

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
      // height: '250px',
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
    private productStoreSerivce: ProductStorePriceService,
    private storeServie: StoreService,
    private productService: ProductService
  ) {}
  public stores: ProductStore[] = [];

  ngOnInit(): void {
    this.productStoreSerivce
      .getStoresForProduct(this.product.id!)
      .subscribe((data) => {
        // Remap the data
        data.forEach((element) => {
          console.log(element);
          let storeId = element[1];
          let productId = element[2];

          let store: Store = new Store();
          let product: Item = new Item();

          let productStore = {
            id: element[0],
            store: store,
            product: product,
            price: element[3],
          };
          this.storeServie.getStoreById(storeId).subscribe((data) => {
            // console.log(data);
            store = data;
          });
          this.productService.getProductById(productId).subscribe((data) => {
            // console.log(data);
            product = data;
          });

          console.log(productStore);
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
    private productStoreSerivce: ProductStorePriceService,
    private storeServie: StoreService,
    private productService: ProductService
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

  getData() {
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
          // console.log(element);
          let storeId = element[1];
          let productId = element[2];

          let store: Store = new Store();
          let product: Item = new Item();

          let productStore = {
            id: element[0],
            store: store,
            product: product,
            price: element[3],
          };
          this.storeServie.getStoreById(storeId).subscribe((data) => {
            // console.log(data);
            store = data;
            productStore.store = store;
          });
          this.productService.getProductById(productId).subscribe((data) => {
            // console.log(data);
            product = data;
            productStore.product = product;
          });

          // console.log(productStore);
          this.stores.push(productStore);
        });
        console.log(this.stores);
      });
  }

  addStore() {
    // TODO Add functionality to add a store
    console.log('Add store');
  }

  removeStore(store: ProductStore) {
    // TODO Add functionality to remove a store
    this.productStoreSerivce.deleteEntity(store.id!).subscribe((data) => {
      this.stores.forEach((element, index) => {
        if (element.id == store.id) {
          this.stores.splice(index, 1);
        }
      });
      console.log(data);
      console.log('Remove store');
      // this.getData();
    });
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
    this.getData();
    this.validateInputFields();
  }
}
