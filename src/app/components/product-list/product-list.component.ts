import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, ChildActivationStart, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  page: any = 0;
  searching_name: string;
  category: string;
  products: Product[] = null;
  count: number = 0;

  
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
    this.initRetrevingProducts();
  }

  initRetrevingProducts (): void {
      this.getParam();
      if (this.searching_name != undefined) {
        this.retrieveProductsByName(this.searching_name);
      } else if (this.category != undefined) {
        this.retrieveProductsByCategory(this.category);
      } else {
        this.retrieveProducts(this.page);
      }
  }

  retrieveProducts(page: any): void {
    this.productService.getSortedProducts(page)
      .subscribe(
        data => {
          this.products = data;
          this.count = data.length;
      });
  }

  retrieveProductsByName(searching_name: string) {
    this.productService.getProductsByName(searching_name)
      .subscribe(
        data => {
          this.products = data;
          this.count = data.length;
      });
  }
  
  retrieveProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category)
      .subscribe(
        data => {
          this.products = data;
          this.count = data.length;
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
        if (params.category != undefined && params.category != null) {
          this.category = params.category;
        }
    });
  }
}
