import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class CartItem {
    id: any;
    customer: Customer;
    product: Product;
    quantity: any;
}
