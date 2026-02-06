import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  http = inject(HttpClient);
  api = 'http://localhost:3000';
  constructor() { }


  getCategories(){
    return this.http.get<Category[]>(`${this.api}/category`);
  }

  getCategoryById(id: string){
    return this.http.get<Category>(`${this.api}/category/${id}`);
  }
  addCategory(name:any){
    return this.http.post(`${this.api}/category`, {
      name:name
    });
  }
  updateCategory(id:string,name:any){
    return this.http.put(`${this.api}/category/${id}`, {
      name:name
    });
  }

   deleteCategoryById(id: string){
    return this.http.delete(`${this.api}/category/${id}`);
  }
}
