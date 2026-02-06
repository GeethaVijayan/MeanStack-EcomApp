import { Component,  inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { CategoriesService } from '../../../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-brand-form',
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
name!:string;
brandService = inject(BrandsService);
 router = inject(Router);
 route = inject(ActivatedRoute)
 isEdit = false;
 id!:any;
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe((brand:any)=>{
        this.name = brand.name;
      });
      // Load brand details for editing (not implemented here)
    }
  
  }

  add(){
    console.log("Adding brand:", this.name);
    this.brandService.addBrand(this.name).subscribe(((result)=>{
      alert("Brand Added");
      this.router.navigateByUrl('/admin/brands');
    }))
  }
  update(){
    console.log("Updating brand:", this.name);
    this.brandService.updateBrand(this.id,this.name).subscribe(((result)=>{
      alert("Brand updated");
      this.router.navigateByUrl('/admin/brands');
    }))
  }
}
