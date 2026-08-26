import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../models/products';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  private handleError(error: any) {
    const errorMsg = error?.error?.message || 'An error occurred';
    this.snackBar.open(errorMsg, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
    return throwError(() => error);
  }

  getProducts() {
    return this.http.get<Products[]>(environment.apiUrl + '/product').pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getProductById(id: string) {
    return this.http.get<Products>(environment.apiUrl + '/product/' + id).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  addProduct(product: any) {
    return this.http.post(environment.apiUrl + '/product/', product).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  updateProduct(id: string, product: any) {
    return this.http.put(environment.apiUrl + '/product/' + id, product).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  deleteProductById(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id).pipe(
      catchError((error) => this.handleError(error))
    );
  }
}
