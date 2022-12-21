import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public name: string = '';
  public price: number = 0;
  public description: string = '';

  public isInputValid: boolean = false;

  validateInputFields() {
    this.isInputValid =
      this.name.length > 0 && this.price > 0 && this.description.length > 0;
    // return this.isInputValid;
  }

  submitForm() {
    // this.isInputValid = this.validateInputFields();
    if (this.isInputValid) {
      let item: Item = {
        name: this.name,
        price: this.price,
        description: this.description,
      };
      this.http
        .post('http://localhost:8080/v1/products', item)
        .subscribe((res) => {
          console.log(res);
        });
      console.log('submit form');
    }
  }
}
