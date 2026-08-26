import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../../models/products';
import { ProductsService } from '../../../services/products.service';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-product-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  categoryService = inject(CategoriesService);
  brandService = inject(BrandsService);
  productService = inject(ProductsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brands: any[] = [];
  categories: any[] = [];
  formBuilder = inject(FormBuilder);
  productForm!: FormGroup;
  id!: any;

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      shortdescription: [null, [Validators.required, Validators.minLength(5)]],
      images: this.formBuilder.array([]),
      price: [null, Validators.required],
      discount: [],
      categoryId: [null, Validators.required],
      brandId: [null],
      isFeatured: [false],
      isNewProduct: [false],
    });
    this.id = this.route.snapshot.params['id'];
    this.addImages();
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.brandService.getBrands().subscribe((result: any) => {
      this.brands = result;
    });

    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result: any) => {
        for (let i = 0; i <= result.images.length; i++) {
          this.addImages();
        }
        this.productForm.patchValue(result as any);
      });
    } else {
      this.addImages();
    }
  }

  addProduct(productForm: any) {
    let value = productForm.value;
    console.log(value, 'value');
    if (this.productForm.valid) {
      this.productService.addProduct(value).subscribe((result: any) => {
        alert('product added successfully');
        this.router.navigateByUrl('/admin/product');
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  updateProduct(productForm: any) {
    let value = productForm.value;
    console.log(value, 'value');
    if (this.productForm.valid) {
      this.productService
        .updateProduct(this.id, value)
        .subscribe((result: any) => {
          alert('product updated successfully');
          this.router.navigateByUrl('/admin/product');
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  addImages() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImages() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
}
