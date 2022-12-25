import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../classes/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/customers`;

  public getCustomers() {
    const url = `${this.apiUrl}`;
    return this.http.get<Customer[]>(url).pipe(catchError(this.handleError));
  }

  public createCustomer(customer: Customer) {
    const url = `${this.apiUrl}`;
    return this.http
      .post<Customer>(url, customer)
      .pipe(catchError(this.handleError));
  }

  public getCustomerById(customerId: number) {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.get<Customer>(url).pipe(catchError(this.handleError));
  }

  public updateCustomerWithId(customerId: number, customer: Customer) {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http
      .put<Customer>(url, customer)
      .pipe(catchError(this.handleError));
  }

  public deleteCustomerWithId(customerId: number) {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
