import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/products`;

  public getProducts() {
    const url = `${this.apiUrl}`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  public createProduct(product: Item) {
    const url = `${this.apiUrl}`;
    return this.http
      .post<Item>(url, product)
      .pipe(catchError(this.handleError));
  }

  public getProductsByCategoryId(categoryId: number) {
    const url = `${this.apiUrl}/category/${categoryId}`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  public getProductsByStoreId(storeId: number) {
    const url = `${this.apiUrl}/store/${storeId}`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  public getProductById(productId: number) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Item>(url).pipe(catchError(this.handleError));
  }

  public updateProductWithId(productId: number, product: Item) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<Item>(url, product).pipe(catchError(this.handleError));
  }

  public deleteProductWithId(productId: number) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
