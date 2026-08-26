import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../models/brands';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  private handleError(error: any) {
    const errorMsg = error?.error?.message || 'An error occurred';
    this.snackBar.open(errorMsg, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
    return throwError(() => error);
  }


  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+'/brand').pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getBrandById(id: string){
    return this.http.get<Brand>(environment.apiUrl +'/brand/' +id).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  addBrand(name:any){
    return this.http.post(environment.apiUrl +'/brand/', {
      name:name
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  updateBrand(id:string,name:any){
    return this.http.put(environment.apiUrl +'/brand/' +id, {
      name:name
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

   deleteBrandById(id: string){
    return this.http.delete(environment.apiUrl +'/brand/' +id).pipe(
      catchError((error) => this.handleError(error))
    );
  }

}
