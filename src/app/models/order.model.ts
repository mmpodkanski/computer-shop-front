import { Customer } from "./customer.model";
import { OrderItem } from "./order-item.model";

export class Order {
    id: any;
    totalCost: any;
    items: OrderItem[];
    customer: Customer;
    status: string;
}
