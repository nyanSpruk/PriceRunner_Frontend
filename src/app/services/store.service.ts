import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../classes/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/stores`;

  public getStores() {
    const url = `${this.apiUrl}`;
    return this.http.get<Store[]>(url).pipe(catchError(this.handleError));
  }

  public createStore(store: Store) {
    const url = `${this.apiUrl}`;
    return this.http.post<Store>(url, store).pipe(catchError(this.handleError));
  }

  public getStoreById(storeId: number) {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.get<Store>(url).pipe(catchError(this.handleError));
  }

  public updateStoreWithId(storeId: number, store: Store) {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.put<Store>(url, store).pipe(catchError(this.handleError));
  }

  public deleteStoreWithId(storeId: number) {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
