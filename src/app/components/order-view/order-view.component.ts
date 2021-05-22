import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { RedirectToCheckoutServerOptions, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  // stripe

  stripe: any;
  successUrl: string = environment.baseurl + "payment/success?sessionId=";
  failedUrl: string = environment.baseurl + "paymentfailed?sessionId=";


  //order
  currentOrder: Order = null;
  id: any;
  totalCost: any = 0;

  
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.retrieveOrder(this.id);
  }

  retrieveOrder(id: any): void {
    this.orderService.getOrder(id)
      .subscribe(
        data => {
          this.currentOrder = data;
          this.totalCost = data.totalCost;
          for (let i=0; i < this.currentOrder.items.length; i++) {
            let item = this.currentOrder.items[i];
            item.totalCost = item.quantity * item.price;
          }
      },
        error => {
          this.router.navigate([`/page-404`]);
    });
  }


   checkout() {
    let sessionId;
    // Call your backend to create the Checkout session.
    this.orderService.createCheckoutList(this.id)
      .subscribe(
        data => {
          sessionId = data.sessionId;
          this.stripe = window.Stripe(environment.STRIPE_PUBLISHABLE_KEY);

          let RedirectToCheckoutServerOptions = { sessionId: sessionId };
          
          return this.stripe.redirectToCheckout(RedirectToCheckoutServerOptions);
      });
  }


  
}

