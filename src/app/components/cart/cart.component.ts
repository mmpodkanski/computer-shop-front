import { Component, Injector, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/_services/cart.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listItems: CartItem[] = [];
  price
  totalCost: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.getCarts();
  }


  getCarts(): void {
    this.cartService.readAllCart()
      .subscribe(
        data => {
          this.listItems = data.carts;
          this.totalCost = data.totalCost;
      });
  }

  removeProductFromCart(id: any): void {
    this.cartService.removeItemFromCart(id)
      .subscribe(
        req => {
          this.refresh();
    });
  }

  // Order

  createOrder(): void {
    const notifier = this.injector.get(NotificationService);
    this.orderService.createOrder()
      .subscribe(
        req => {
          notifier.showSuccess("Zamówienie zostało złożone!");
        }
      )
  }

  refresh(): void {
    window.location.reload();
  } 
}
