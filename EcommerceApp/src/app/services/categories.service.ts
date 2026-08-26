import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  private handleError(error: any) {
    const errorMsg = error?.error?.message || 'An error occurred';
    this.snackBar.open(errorMsg, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
    return throwError(() => error);
  }


  getCategories(){
    return this.http.get<Category[]>(`${environment.apiUrl}/category`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getCategoryById(id: string){
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  addCategory(name:any){
    return this.http.post(`${environment.apiUrl}/category`, {
      name:name
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  updateCategory(id:string,name:any){
    return this.http.put(`${environment.apiUrl}/category/${id}`, {
      name:name
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

   deleteCategoryById(id: string){
    return this.http.delete(`${environment.apiUrl}/category/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }
}
