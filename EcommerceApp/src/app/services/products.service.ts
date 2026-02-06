import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../models/products';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get<Products[]>(environment.apiUrl + '/product');
  }

  getProductById(id: string) {
    return this.http.get<Products>(environment.apiUrl + '/product/' + id);
  }
  addProduct(name: any) {
    return this.http.post(environment.apiUrl + '/product/', {
      name: name,
    });
  }
  updateProduct(id: string, name: any) {
    return this.http.put(environment.apiUrl + '/product/' + id, {
      name: name,
    });
  }

  deleteProductById(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
