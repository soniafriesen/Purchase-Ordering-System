import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GenericHttpService<T> {
  // can't inject primitives, so use the @Inject decorator on url
  constructor(
    private httpClient: HttpClient,
    @Inject(String) private url: string
  ) {} // constructor
  public add(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}`, item);
  } // add
  public update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}`, item);
  } // update
  public getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}`);
  } // getAll
  public delete(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.url}/${id}`);
  } // delete
  public deleteString(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/${id}`);
  } // delete
  public getById(id: number): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${id}`);
  } // getById
} // GenericHttpService
