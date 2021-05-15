import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

const baseUrl = environment.baseurl + 'orders';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  
  getAllOrders(id: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}`);
  }

  getOrder(id: any): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/${id}`);
  }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(`${baseUrl}`, null);
  }

  createCheckoutList(id: any): Observable<any> { // important response key!
    return this.http.post<any>(`${baseUrl}/checkout?orderId=${id}}`, id);
  }

  deleteOrder(id: any): Observable<Order> {
    return this.http.delete<Order>(`${baseUrl}/${id}`);
  }
}
