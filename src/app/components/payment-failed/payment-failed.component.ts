import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.goToHome();
  }

  goToHome() {
    setTimeout(() => {
      setTimeout(() => {
        this.router.navigate(["/products"]);
      });
    }, 5000);
  }
}
