import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  izdelki: Item[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      data.forEach((element) => {
        this.izdelki.push(element);
      });
    });
  }
}
