import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatFactsService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/cat-facts`;

  public getCatFact() {
    return this.http.get(this.apiUrl);
  }
}
