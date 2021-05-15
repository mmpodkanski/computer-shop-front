import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AddToCart } from '../models/add-to-cart.model';
import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';

const baseUrl = environment.baseurl + 'cart';

@Injectable({
  providedIn: 'root'
})


export class CartService {

  constructor(private http: HttpClient) { }


  readAllCart(): Observable<Cart> {
    return this.http.get<Cart>(`${baseUrl}`);
  }

  addItemToCart(item: AddToCart): Observable<CartItem> {
    return this.http.post<CartItem>(`${baseUrl}`, item);
  }

  // update

  removeItemFromCart(id: any): Observable<any> {
    return this.http.delete<CartItem>(`${baseUrl}/${id}`);
  }

  // deleteAll

}
