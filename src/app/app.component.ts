import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Item } from './classes/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PriceRunner_Frontend';

  constructor(private http: HttpClient) {}
  izdelki: Item[] = [];
  ngOnInit() {
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
