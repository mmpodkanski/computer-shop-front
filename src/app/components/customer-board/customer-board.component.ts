import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDetails } from 'src/app/models/customer-details.model';
import { Order } from 'src/app/models/order.model';
import { CustomerService } from 'src/app/_services/customer.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-customer-board',
  templateUrl: './customer-board.component.html',
  styleUrls: ['./customer-board.component.css']
})
export class CustomerBoardComponent implements OnInit {

  detailsAreAdded = false;
  details: CustomerDetails = null;

  orders: Order[] = [];

  newDetails: CustomerDetails = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    city: '',
    country: ''
  }
  isUpdateFailed = false;
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private injector: Injector,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.retrieveDetails();
    this.retrieveOrders();
  }

  retrieveDetails(): void {
    this.customerService.getCustomerDetails()
      .subscribe(
        data => {
          this.details = data.details;


          if (this.details != null) {
            this.detailsAreAdded = true;

            switch(data.details.gender) {
              case "MAN":
                this.details.gender = "MĘŻCZYZNA";
                break;
              case "WOMEN":
                this.details.gender = "KOBIETA";
                break;
              case "OTHER":
                this.details.gender = "INNA";
                break;
            }
          }
      });
  }

  retrieveOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(
        data => {
          this.orders = data;
      });
  }

  changeStatus(): void {
    this.detailsAreAdded = false;
  }

  updateDetails(): void {
    const notifier = this.injector.get(NotificationService);
    this.customerService.updateCustomerDetails(this.newDetails)
      .subscribe(
        req => {
          this.retrieveDetails();
          this.detailsAreAdded = true;
          notifier.showSuccess('Dane zostały zapisane!');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
    });
  }

  cancelOrder(id: any): void {
    const notifier = this.injector.get(NotificationService);
    this.orderService.deleteOrder(id)
      .subscribe(
        req => {
          this.retrieveOrders();
          notifier.showSuccess('Zamówienie zostało anulowane!');
    });
  }

  processOrder(id: any): void {
    this.router.navigate(['/orders', id]);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
