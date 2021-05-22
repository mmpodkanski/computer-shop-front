import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetails } from '../models/customer-details.model';

const baseurl = environment.baseurl + 'customer'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerDetails(): Observable<any> {
    return this.http.get<any>(`${baseurl}`);
  }

  updateCustomerDetails(details: CustomerDetails): Observable<CustomerDetails> {
    return this.http.put<CustomerDetails>(`${baseurl}?details`, details);
  }

}
