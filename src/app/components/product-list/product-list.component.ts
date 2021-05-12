import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page: any = 0;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getParam();
    this.retrieveProducts(this.page);
  }

  retrieveProducts(page: any): void {
    this.productService.getSortedProducts(page)
      .subscribe(
        data => {
          this.products = data;
      });
  }

  getParam(): void {
    let param = null;

    this.route.queryParams
      .subscribe(params => {
        param = params.page;
      }
    );

    if (param != null){
      this.page = param;
      console.log(this.page);
    }
  }
}
