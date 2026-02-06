import { Component,  inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { CategoriesService } from '../../../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  
 name!:string;
 categoryService = inject(CategoriesService);
 router = inject(Router);
 route = inject(ActivatedRoute)
 isEdit = false;
 id!:any;
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((category:any)=>{
        this.name = category.name;
      });
      // Load category details for editing (not implemented here)
    }
  
  }

  add(){
    console.log("Adding category:", this.name);
    this.categoryService.addCategory(this.name).subscribe(((result)=>{
      alert("Category Added");
      this.router.navigateByUrl('/admin/categories');
    }))
  }
  update(){
    console.log("Updating category:", this.name);
    this.categoryService.updateCategory(this.id,this.name).subscribe(((result)=>{
      alert("Category updated");
      this.router.navigateByUrl('/admin/categories');
    }))
  }
} 
  