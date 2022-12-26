import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductStorePriceService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/product-store-prices`;

  public getStoresForProduct(productId: number) {
    const url = `${this.apiUrl}/product/${productId}`;
    return this.http.get<[]>(url).pipe(catchError(this.handleError));
  }

  public deleteEntity(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
