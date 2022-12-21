import { Component, OnInit } from '@angular/core';
import { faCartShopping, faUserAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faCart = faCartShopping;
  faUser = faUserAlt;
  pageTitle: string = 'Price Runner';
}
