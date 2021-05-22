import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
    ) {
   }

  ngOnInit(): void {
    this.goToHome();
    this.checkOrder();
  }


  // checkOrder() {
  //   let sessionId

  //   this.route.queryParams.subscribe(params => {
  //     sessionId = params.sessionId;
  //   });

  //   this.orderService.checkOrder(this.sessionId)
  //     .subscribe(
  //       req => {
  //         //  notifier
  //     });
  // }

  checkOrder() {
    let orderId;

    this.route.queryParams.subscribe(params => {
      orderId = params.orderId;
    });

    this.orderService.checkOrder(orderId)
      .subscribe(
        req => {
          //  notifier
      });
  }

  goToHome() {
    setTimeout(() => {
      setTimeout(() => {
        this.router.navigate(["/products"]);
      });
    }, 5000);
  }
}
