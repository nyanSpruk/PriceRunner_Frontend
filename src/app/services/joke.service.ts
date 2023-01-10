import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/jokes`;

  public getJoke() {
    return this.http.get(this.apiUrl);
  }
}
