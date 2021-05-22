import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductRequest } from 'src/app/models/product-request.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  newProduct: ProductRequest = {
    name: '',
    code: '',
    description: '',
    category: '',
    price: 0,
    quantity: 1,
    condition: '',
    imgLogoUrl: ''
  }
  hasAdminRole = false;

  constructor
  (
    private productService: ProductService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private injector: Injector
    ) { }

  ngOnInit(): void {
    this.hasAdminRole = this.tokenStorage.getUser().role.includes('ROLE_ADMIN');
  }


  addProduct(): void {
    const notifier = this.injector.get(NotificationService);
    console.log(this.newProduct);
    this.productService.addProduct(this.newProduct)
      .subscribe(
        req => {
          this.router.navigate([`/products`]);
          if (this.hasAdminRole) {
            notifier.showSuccess('Produkt został dodany!');
          } else {
            notifier.showSuccess('Nie masz takich uprawnień!');
          }

      });
  }


}
