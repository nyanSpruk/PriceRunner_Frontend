import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public name: String = '';
  public price: Number = 0;
  public description: String = '';

  public isInputValid: Boolean = false;

  validateInputFields() {
    this.isInputValid =
      this.name.length > 0 && this.price > 0 && this.description.length > 0;
    // return this.isInputValid;
  }

  submitForm() {
    // this.isInputValid = this.validateInputFields();
    if (this.isInputValid) {
      console.log('submit form');
    }
  }
}
