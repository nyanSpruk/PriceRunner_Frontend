import { Component, OnInit } from '@angular/core';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  pageTitle: string = 'Price Runner';
}
