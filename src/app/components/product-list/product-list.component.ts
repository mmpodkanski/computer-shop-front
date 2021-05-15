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
  searching_name: string;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    };
     }

  ngOnInit(): void {
    this.getParam();
    this.retrieveProducts(this.page);
    if (this.searching_name.length > 0) {
      this.retrieveProductsByName(this.searching_name);
    }
  }
  retrieveProductsByName(searching_name: string) {
    this.productService.getProductsByName(searching_name)
      .subscribe(
        data => {
          this.products = data;
      });
  }

  retrieveProducts(page: any): void {
    this.productService.getSortedProducts(page)
      .subscribe(
        data => {
          this.products = data;
      });
  }

  previousPage(): void {
    let previousPage = this.page-1;
    this.router.navigate(['/products'], {queryParams: {page: previousPage}});
  }

  nextPage(): void {
    let nextPage = this.page+1;
    this.router.navigate(['/products'], {queryParams: {page: nextPage}});
  }

  getParam(): void {

    this.route.queryParams
      .subscribe(params => {
        if (params.page != undefined && params.page != null) {
          this.page = parseInt(params.page);
        }
        if (params.search != undefined && params.search != null) {
          this.searching_name = params.search;
        }
    });
  }
}
