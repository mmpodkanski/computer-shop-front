import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCart } from 'src/app/models/add-to-cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/_services/cart.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  isLoggedIn = false;
  id: any;
  currentProduct: Product = null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private injector: Injector,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.id = this.route.snapshot.paramMap.get('id');
    this.retrieveProduct(this.id);
  }


  addToCart(): void {
    const notifier = this.injector.get(NotificationService);
    if(!this.isLoggedIn) {
      this.router.navigate([`/login`]);
      notifier.showError('Aby dodać produkt do koszyka, należy się zalogować!');
    } else {
      let addToCartItem: AddToCart = {
        id: 0,
        productId: this.currentProduct.id,
        quantity: 1,
      }

      this.cartService.addItemToCart(addToCartItem)
        .subscribe(
          req => {
            notifier.showSuccess('Dodano produkt do koszyka!');
          }
        )
    }
  }

  retrieveProduct(id: any): void {
    this.productService.getProductById(id)
      .subscribe(
        data => {
          this.currentProduct = data;
          switch (data.condition){
            case("NEW"):
              this.currentProduct.condition="NOWY";
              break;
            case("USED"):
              this.currentProduct.condition="UŻYWANY";
              break;
          }
        },
        error => {
          this.router.navigate([`/page-404`]);
      });
  }


}
