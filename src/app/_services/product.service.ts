import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductRequest } from '../models/product-request.model';

const baseUrl = environment.baseurl + 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getSortedProducts(page: any): Observable<Product[]> {
  return this.http.get<Product[]>(`${baseUrl}?page=${page}`);
  }
  
  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}?name=${name}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}?category=${category}`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  addProduct(data: ProductRequest): Observable<any> {
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
