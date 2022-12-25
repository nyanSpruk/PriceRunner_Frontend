import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<Category[]>('http://localhost:8080/v1/categories')
      .subscribe((res) => {
        res.forEach((element) => {
          this.categories.push(element);
        });
        console.log(this.categories);
      });
  }

  public name: string = '';
  public price: number = 0;
  public description: string = '';
  public category_id: number = 0;

  public categories: Category[] = [];

  public isInputValid: boolean = false;

  validateInputFields() {
    this.isInputValid =
      this.name.length > 0 &&
      this.price > 0 &&
      this.description.length > 0 &&
      this.category_id > 0;
    // return this.isInputValid;
  }

  submitForm() {
    // this.isInputValid = this.validateInputFields();
    if (this.isInputValid) {
      let item: Item = {
        name: this.name,
        price: this.price,
        description: this.description,
        category_id: this.category_id,
      };
      this.http
        .post('http://localhost:8080/v1/products', item)
        .subscribe((res) => {
          console.log(item);
          console.log(res);
        });
      // TODO IN API PREVENT HAVING TWO ITESM WITH SAME NAME...
      this.router.navigate(['/']);
      console.log('submit form');
    }
  }
}
