import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Category } from 'src/app/classes/category';
import { CatFact } from 'src/app/classes/catFact';
import { Item } from 'src/app/classes/item';
import { ProductStore } from 'src/app/classes/product-store';
import { Store } from 'src/app/classes/store';
import { CatFactsService } from 'src/app/services/cat-facts.service';
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
    private catFactsSerivce: CatFactsService,
    public dialog: MatDialog
  ) {}

  catFact?: CatFact;
  izdelkiStores: any = [];

  ngOnInit(): void {
    this.catFactsSerivce.getCatFact().subscribe((data) => {
      console.log(data);
      this.catFact = data;
    });

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

  deleteProduct(izdelek: Item) {
    this.productService.deleteProductWithId(izdelek.id!).subscribe((data) => {
      console.log(data);
      this.izdelki = this.izdelki.filter((item) => item.id !== izdelek.id);
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
        this.storeServie.getStores().subscribe((data) => {
          console.log(data);
          let storesInUse: string[] = [];
          this.stores.forEach((store) => {
            console.log(store.store.name!);
            storesInUse.push(store.store.name!);
          });

          console.log('storesInUse');
          console.log(storesInUse);
          // console.log(this.allStores);
        });
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

  storeName: string = '';
  storePrice: number = 0;
  allStores: Store[] = [];
  allStoreNames: string[] = [];
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
        this.storeServie.getStores().subscribe((data) => {
          console.log(data);
          let storesInUse: string[] = [];
          this.allStoreNames = [];
          this.allStores = [];
          this.stores.forEach((store) => {
            console.log(store.store.name!);
            storesInUse.push(store.store.name!);
          });

          console.log('storesInUse');
          console.log(storesInUse);
          this.allStoreNames = [];
          this.allStores = [];
          data.forEach((element) => {
            // Add to all stores if its not in stores
            if (!storesInUse.includes(element.name!)) {
              this.allStores.push(element);
              this.allStoreNames.push(element.name!);
            }
          });
          // console.log(this.allStores);
        });
      });
  }
  areStoreFieldsValid: boolean = false;
  areStoreFieldsValidFun() {
    this.areStoreFieldsValid = this.storeName != '' && this.storePrice > 0;
    console.log('STORE ', this.areStoreFieldsValid);
  }

  addStore() {
    // TODO Add functionality to add a store
    // console.log(this.storeName);
    // console.log(this.storePrice);

    let store: Store = new Store();
    let StoreProduct: ProductStore = {
      store: store,
      product: this.product,
      price: this.storePrice,
    };
    if (this.allStoreNames.includes(this.storeName)) {
      console.log('Store already exists');
      this.allStores.forEach((element) => {
        if (element.name == this.storeName) {
          store = element;
          StoreProduct.store = store;
          console.log(StoreProduct);
          this.productStoreSerivce
            .createEntity(StoreProduct)
            .subscribe((data) => {
              console.log(data);
              this.stores.push(data);
            });

          this.allStores.forEach((element, index) => {
            if (element.name == this.storeName) {
              this.allStores.splice(index, 1);
            }
          });
          console.log('Add store');
          // this.getData();
          this.storeName = '';
          this.storePrice = 0;
        }
      });
    } else {
      store.name = this.storeName;
      this.storeServie.createStore(store).subscribe((data) => {
        console.log(data);
        store = data;
        store.id = data.id;
        store.name = this.storeName;
        let StoreProduct: ProductStore = {
          store: store,
          product: this.product,
          price: this.storePrice,
        };

        console.log(JSON.stringify(StoreProduct));
        this.productStoreSerivce
          .createEntity(StoreProduct)
          .subscribe((data) => {
            console.log(data);
            this.stores.push(data);
          });

        this.allStores.forEach((element, index) => {
          if (element.name == this.storeName) {
            this.allStores.splice(index, 1);
          }
        });
        console.log('Add store');
        // this.getData();
        this.storeName = '';
        this.storePrice = 0;
      });
    }
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
    this.areStoreFieldsValidFun();
  }
}
