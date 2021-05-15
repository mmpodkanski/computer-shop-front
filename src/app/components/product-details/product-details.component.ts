import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: any;
  currentProduct: Product = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.currentProduct);
    this.id = this.route.snapshot.paramMap.get('id');
    this.retrieveProduct(this.id);
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
