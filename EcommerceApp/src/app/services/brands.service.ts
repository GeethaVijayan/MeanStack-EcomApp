import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../models/brands';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {


  http = inject(HttpClient);
 
  constructor() { }


  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+'/brand');
  }

  getBrandById(id: string){
    return this.http.get<Brand>(environment.apiUrl +'/brand/' +id);
  }
  addBrand(name:any){
    return this.http.post(environment.apiUrl +'/brand/', {
      name:name
    });
  }
  updateBrand(id:string,name:any){
    return this.http.put(environment.apiUrl +'/brand/' +id, {
      name:name
    });
  }

   deleteBrandById(id: string){
    return this.http.delete(environment.apiUrl +'/brand/' +id);
  }

}
