import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Item } from 'src/app/classes/item';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      data.forEach((element) => {
        this.categories.push(element);
      });
    });
  }

  public name: string = '';
  public description: string = '';
  public category: Category = { id: 0, name: '' };

  public categories: Category[] = [];

  public isInputValid: boolean = false;

  validateInputFields() {
    this.isInputValid =
      this.name.length > 0 &&
      this.description.length > 0 &&
      this.category !== undefined;
    // return this.isInputValid;
  }

  submitForm() {
    // this.isInputValid = this.validateInputFields();
    if (this.isInputValid) {
      let item: Item = {
        name: this.name,
        description: this.description,
        category: this.category,
      };
      // console.log(this.category);
      // console.log(item);

      this.productService.createProduct(item).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/']);
      });

      // TODO IN API PREVENT HAVING TWO ITESM WITH SAME NAME...
      console.log('submit form');
    }
  }
}
