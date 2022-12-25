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
  public category: Category = { id: 0, name: '' };

  public categories: Category[] = [];

  public isInputValid: boolean = false;

  validateInputFields() {
    this.isInputValid =
      this.name.length > 0 &&
      this.price > 0 &&
      this.description.length > 0 &&
      this.category !== undefined;
    // return this.isInputValid;
  }

  submitForm() {
    // this.isInputValid = this.validateInputFields();
    if (this.isInputValid) {
      let item: Item = {
        name: this.name,
        price: this.price,
        description: this.description,
        category: this.category,
      };
      // console.log(this.category);
      // console.log(item);
      this.http
        .post('http://localhost:8080/v1/products', item)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/']);
        });
      // TODO IN API PREVENT HAVING TWO ITESM WITH SAME NAME...
      console.log('submit form');
    }
  }
}
