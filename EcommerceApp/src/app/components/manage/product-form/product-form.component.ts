import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Products } from '../../../models/products';
import { ProductsService } from '../../../services/products.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule,RouterLink
  ],  
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null,Validators.required,Validators.minLength(5)],
    Description: [null,Validators.required,Validators.minLength(10)],
    shortDescription:[null,Validators.required,Validators.minLength(50)],
    images:[],
    price:[null,Validators.required],
    discount:[],
    categroyId:[null,Validators.required],
  })
}
