import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  izdelek!: Item;
}
