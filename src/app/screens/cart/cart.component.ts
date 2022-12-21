import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  izdelki: Item[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Item[]>('http://localhost:8080/v1/products')
      .subscribe((data) => {
        console.log(data);
        data.forEach((element) => {
          console.log(element);
          this.izdelki.push(element);
        });
      });
  }
}
