import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../classes/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/carts`;

  public getCarts() {
    const url = `${this.apiUrl}`;
    return this.http.get<Cart[]>(url).pipe(catchError(this.handleError));
  }

  // TODO RETURN ID when creating a cart
  public createCart(cart: Cart = {}) {
    const url = `${this.apiUrl}`;
    return this.http.post(url, cart).pipe(catchError(this.handleError));
  }

  public getCartById(cartId: number) {
    const url = `${this.apiUrl}/${cartId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public updateCartWithId(cartId: number, cart: Cart) {
    const url = `${this.apiUrl}/${cartId}`;
    return this.http.put(url, cart).pipe(catchError(this.handleError));
  }

  public deleteCartWithId(cartId: number) {
    const url = `${this.apiUrl}/${cartId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  public addItemToCart(cartId: number, itemId: number) {
    const url = `${this.apiUrl}/${cartId}/add/${itemId}`;
    return this.http.put(url, '{}').pipe(catchError(this.handleError));
  }

  public removeItemFromCart(cartId: number, itemId: number) {
    const url = `${this.apiUrl}/${cartId}/remove/${itemId}`;
    return this.http.put(url, '{}').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
