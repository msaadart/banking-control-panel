import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = `${environment.API_BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(link:string) {
    return this.http.get<any>(`${this.url}${link}`);
  }

  getById(id: any, link:string) {
    return this.http.get<any>(`${this.url}${link}/${id}`);
  }

  save(data: any, link:string) {
    return this.http.post<any>(`${this.url}${link}`, data);
  }

  update(data: any, id: any, link:string) {
    return this.http.put<any>(`${this.url}${link}/${id}`, data);
  }

  delete(id: any, link:string) {
    return this.http.delete<any>(`${this.url}${link}/${id}`);
  }
}