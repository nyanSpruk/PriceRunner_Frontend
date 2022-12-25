import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/categories`;

  public getCategories() {
    const url = `${this.apiUrl}`;
    return this.http.get<Category[]>(url).pipe(catchError(this.handleError));
  }

  public createCategory(category: Category) {
    const url = `${this.apiUrl}`;
    return this.http
      .post<Category>(url, category)
      .pipe(catchError(this.handleError));
  }

  public getCategoryById(categoryId: number) {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<Category>(url).pipe(catchError(this.handleError));
  }

  public updateCategoryWithId(categoryId: number, category: Category) {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http
      .put<Category>(url, category)
      .pipe(catchError(this.handleError));
  }

  public deleteCategoryWithId(categoryId: number) {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => (error.error && error.error.message) || error.statusText
    );
  }
}
