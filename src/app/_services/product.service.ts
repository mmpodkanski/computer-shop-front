import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const baseUrl = environment.baseurl + 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getSortedProducts(page: any): Observable<Product[]> {
  return this.http.get<Product[]>(`${baseUrl}?page=${page}`);
  }

  getProductsByCategory(category: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}?category=${category}`);
  }

  getProductsByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}?code=${code}`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  increaseProductStock(id: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}?increase`, id);
  }

  decreaseProductStock(id: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}?decrease`, id);
  }

}
